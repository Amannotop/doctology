import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession, rateLimit } from "@/lib/auth";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`login:${ip}`, 8, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });

  let admin = null;
  try {
    admin = await prisma.admin.findUnique({ where: { email } });
  } catch {}

  if (!admin) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });

  await createSession(admin.id, admin.email);
  return NextResponse.json({ ok: true });
}
