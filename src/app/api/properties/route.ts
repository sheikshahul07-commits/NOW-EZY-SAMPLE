import { NextResponse } from 'next/server';
import { INITIAL_PROPERTIES } from '@/data/mockData';
import { checkRateLimit, maskPhoneNumber } from '@/lib/security';

export async function GET(request: Request) {
  // 1. Anti-Scraping Rate Limit Check (IP-based)
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const rateLimitResult = checkRateLimit(`rate-limit:properties:${clientIp}`, 60, 60000);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: 'Too many requests. Anti-scraping shield activated.',
        message: 'To protect owner privacy, high-frequency automated scraping is strictly blocked.'
      },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-Anti-Scraping-Shield': 'Active'
        }
      }
    );
  }

  // 2. Data Sanitization: Mask all owner PII to prevent harvest
  const sanitizedProperties = INITIAL_PROPERTIES.map((prop) => ({
    ...prop,
    verifiedOwner: {
      ...prop.verifiedOwner,
      // Phone is never exposed in raw text on public feed
      phone: maskPhoneNumber(prop.verifiedOwner.phone),
      isProtected: true
    }
  }));

  // 3. Return sanitized feed with strict privacy and security headers
  return NextResponse.json(
    {
      success: true,
      count: sanitizedProperties.length,
      data: sanitizedProperties,
      security: {
        vaultStatus: 'ENCRYPTED_256_BIT',
        antiScrapingActive: true,
        remainingQuota: rateLimitResult.remaining
      }
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'X-Data-Protection': 'NowEzy-Zero-Trust-Vault'
      }
    }
  );
}
