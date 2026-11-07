import crypto from 'crypto';

/**
 * Enterprise PII Protection & Data Sanitization Library
 * Ensures no plain-text phone numbers, emails, or personal identifiers
 * are ever exposed over public client feeds or vulnerable to web scrapers.
 */

// In-Memory Rate Limiting Cache (IP & Token based)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || entry.expiresAt < now) {
    rateLimitMap.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}

/**
 * Mask Phone Number:
 * Turns "+91 98451 99001" into "+91 98450 •••••"
 * Prevents telemarketers and bots from harvesting landlord numbers.
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone) return '+91 ••••• •••••';
  const clean = phone.replace(/[^\d+]/g, '');
  if (clean.length < 8) return '+91 ••••• •••••';
  const prefix = clean.slice(0, clean.length - 5);
  return `${prefix} •••••`;
}

/**
 * Mask Email Address:
 * Turns "rahul.sharma@example.com" into "r•••a@example.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '•••@••••.com';
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user[0]}*@${domain}`;
  return `${user[0]}••••${user[user.length - 1]}@${domain}`;
}

/**
 * Generate Secure Cryptographic Session Token
 */
export function generateSecureToken(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 86400000 })).toString('base64url');
  const secret = process.env.NOWEZY_SECURITY_SECRET || 'nowezy-enterprise-shield-2026-bachelors-vault';
  const signature = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

/**
 * Verify Secure Token
 */
export function verifySecureToken(token: string): { valid: boolean; payload?: Record<string, unknown> } {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false };
    const [header, body, signature] = parts;
    const secret = process.env.NOWEZY_SECURITY_SECRET || 'nowezy-enterprise-shield-2026-bachelors-vault';
    const expected = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');

    const expectedBuffer = Buffer.from(expected);
    const signatureBuffer = Buffer.from(signature);

    if (expectedBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) {
      return { valid: false };
    }

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Date.now()) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}
