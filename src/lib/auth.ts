import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "docto_admin";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "dev-secret-change-me-please-32-chars-min"
);

export async function createSession(adminId: string, email: string) {
  const token = await new SignJWT({ adminId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secret);
  // Secure cookies require HTTPS. Only flag Secure when the public URL
  // is https — otherwise browsers silently drop the cookie on http
  // (e.g. local LAN testing via http://192.168.x.x:3000) and login
  // appears to succeed but the session never sticks.
  const useSecure =
    (process.env.PUBLIC_SITE_URL ?? "").startsWith("https://");
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: useSecure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return token;
}

export async function getSession(): Promise<{ adminId: string; email: string } | null> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    return { adminId: String(payload.adminId), email: String(payload.email) };
  } catch {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

// Simple in-memory rate limiter for login (per process)
const attempts = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, max = 8, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.reset) {
    attempts.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}
