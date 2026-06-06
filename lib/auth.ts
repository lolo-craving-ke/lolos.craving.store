import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

const COOKIE_NAME = 'lolos_admin_session';

function secret() {
  return process.env.ADMIN_SESSION_SECRET || 'dev-secret-change-me';
}

export function createSessionValue(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifySession(value?: string) {
  if (!value) return false;
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return false;
  const expected = crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
  if (expected !== signature) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof data.exp === 'number' && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function setAdminSession(email: string) {
  cookies().set(COOKIE_NAME, createSessionValue(email), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearAdminSession() {
  cookies().delete(COOKIE_NAME);
}

export function requireAdmin() {
  const session = cookies().get(COOKIE_NAME)?.value;
  if (!verifySession(session)) redirect('/admin/login');
}
