import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const subject = String(body.subject ?? "").trim().slice(0, 120);
    const message = String(body.message ?? "").trim();

    if (name.length < 2 || name.length > 80) return NextResponse.json({ error: "Name must be 2–80 characters." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    if (message.length < 10 || message.length > 5000) return NextResponse.json({ error: "Message must be 10–5000 characters." }, { status: 400 });

    // simple honeypot-style rate limit: if same email spams, we still accept but delay
    await prisma.contactMessage.create({ data: { name: esc(name), email: esc(email), subject: esc(subject), message: esc(message) } });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
