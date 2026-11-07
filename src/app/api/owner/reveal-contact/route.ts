import { NextResponse } from 'next/server';
import { INITIAL_PROPERTIES } from '@/data/mockData';
import { checkRateLimit } from '@/lib/security';

// In-Memory Secure Audit Vault (Tracks all contact reveals for compliance and landlord safety)
interface AccessAuditLog {
  id: string;
  timestamp: string;
  propertyId: string;
  clientIp: string;
  userIdentifier: string;
  status: 'GRANTED' | 'RATE_LIMITED' | 'UNAUTHORIZED';
}

const auditLogs: AccessAuditLog[] = [];

export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const body = await request.json();
    const { propertyId, subscriptionActive, userIdentifier } = body;

    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
    }

    // 1. Strict Anti-Broker Rate Limiting: Max 10 reveals per hour per user/IP
    const rateLimitKey = `rate-limit:reveal:${userIdentifier || clientIp}`;
    const rateCheck = checkRateLimit(rateLimitKey, 10, 3600000); // 10 per hour

    if (!rateCheck.allowed) {
      const logEntry: AccessAuditLog = {
        id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: new Date().toISOString(),
        propertyId,
        clientIp,
        userIdentifier: userIdentifier || 'anonymous',
        status: 'RATE_LIMITED'
      };
      auditLogs.push(logEntry);

      return NextResponse.json(
        {
          error: 'Rate limit exceeded: Max 10 owner contacts can be revealed per hour.',
          message: 'To prevent broker spamming and protect homeowner privacy, reveals are capped at 10 per hour.'
        },
        { status: 429 }
      );
    }

    // 2. Subscription Verification Check
    if (!subscriptionActive) {
      const logEntry: AccessAuditLog = {
        id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: new Date().toISOString(),
        propertyId,
        clientIp,
        userIdentifier: userIdentifier || 'anonymous',
        status: 'UNAUTHORIZED'
      };
      auditLogs.push(logEntry);

      return NextResponse.json(
        {
          error: 'Subscription required',
          requiresSubscription: true,
          message: 'Access to verified direct owner contacts requires an active Now Ezy Bachelor Pass (₹499 for 60 days).'
        },
        { status: 403 }
      );
    }

    // 3. Find Property
    const property = INITIAL_PROPERTIES.find((p) => p.id === propertyId);
    if (!property) {
      return NextResponse.json({ error: 'Property listing not found' }, { status: 404 });
    }

    // 4. Record Successful Audit Entry
    const auditId = `aud-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const logEntry: AccessAuditLog = {
      id: auditId,
      timestamp: new Date().toISOString(),
      propertyId,
      clientIp,
      userIdentifier: userIdentifier || 'verified_bachelor',
      status: 'GRANTED'
    };
    auditLogs.push(logEntry);

    // Keep log buffer bounded
    if (auditLogs.length > 500) {
      auditLogs.shift();
    }

    // 5. Safely Reveal Verified Phone and WhatsApp Direct Action Link
    const rawPhone = property.verifiedOwner.phone;
    const cleanPhoneDigits = rawPhone.replace(/\D/g, '');
    const whatsAppUrl = `https://wa.me/${cleanPhoneDigits}?text=${encodeURIComponent(
      `Hello ${property.verifiedOwner.name}, I found your bachelor-friendly listing "${property.title}" on Now Ezy. I would like to schedule a visit.`
    )}`;

    return NextResponse.json({
      success: true,
      data: {
        propertyId: property.id,
        ownerName: property.verifiedOwner.name,
        revealedPhone: rawPhone,
        whatsAppLink: whatsAppUrl,
        auditReference: auditId,
        verifiedDirectOwner: property.verifiedOwner.isDirectOwner,
        remainingHourQuota: rateCheck.remaining
      }
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal security vault error', details: (err as Error).message },
      { status: 500 }
    );
  }
}

// GET method allows inspection of anonymized audit stats
export async function GET() {
  return NextResponse.json({
    totalAuditedRequests: auditLogs.length,
    recentAudits: auditLogs.slice(-10).map((log) => ({
      id: log.id,
      timestamp: log.timestamp,
      status: log.status,
      propertyId: log.propertyId
    }))
  });
}
