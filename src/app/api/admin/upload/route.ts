import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"]);
const MAX = 4 * 1024 * 1024;

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Invalid form" }, { status: 400 });
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (!ALLOWED.has(file.type)) return NextResponse.json({ error: "Only images allowed (jpg, png, webp, avif, svg)." }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Max 4MB." }, { status: 400 });
  const ext = path.extname(file.name) || (file.type === "image/jpeg" ? ".jpg" : file.type === "image/png" ? ".png" : ".webp");
  const safe = crypto.randomBytes(8).toString("hex") + ext.toLowerCase().replace(/[^.\w]/g, "");
  const buf = Buffer.from(await file.arrayBuffer());

  // Basic SVG sanitization: reject scripts
  if (file.type === "image/svg+xml" && /<script/i.test(buf.toString("utf8"))) {
    return NextResponse.json({ error: "SVG contains script." }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, safe), buf);

  const url = `/uploads/${safe}`;
  // Optionally persist to MediaAsset if DB available
  try {
    const { prisma } = await import("@/lib/db");
    await prisma.mediaAsset.create({ data: { filename: safe, url, alt: String(form.get("alt") ?? ""), mime: file.type, size: file.size } });
  } catch {}

  return NextResponse.json({ url });
}
