import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

function bustCache() {
  // Revalidate the whole public tree so CMS edits go live immediately.
  revalidatePath("/", "layout");
}

const TABLES: Record<string, { model: string }> = {
  subjects: { model: "subject" },
  features: { model: "feature" },
  resources: { model: "resource" },
  faqs: { model: "faq" },
  pricing: { model: "pricingPlan" },
};

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const kind = searchParams.get("kind") ?? "";
  if (!TABLES[kind]) return NextResponse.json({ error: "Unknown kind" }, { status: 400 });

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await (prisma as any)[TABLES[kind].model].findMany({ orderBy: kind === "faqs" || kind === "features" || kind === "pricing" ? { order: "asc" } : kind === "subjects" ? { order: "asc" } : { createdAt: "desc" } });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const kind = String(body.kind ?? "");
  const payload = body.payload as Record<string, unknown>;
  if (!TABLES[kind] || !payload) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  try {
    // Basic sanitization: trim strings
    for (const k of Object.keys(payload)) if (typeof payload[k] === "string") payload[k] = (payload[k] as string).trim();

    // Require minimal fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const created = await (prisma as any)[TABLES[kind].model].create({ data: payload });
    bustCache();
    return NextResponse.json({ data: created });
  } catch {
    return NextResponse.json({ error: "Failed to create. Check fields and uniqueness (e.g. slug)." }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const kind = String(body.kind ?? "");
  const id = String(body.id ?? "");
  const payload = body.payload as Record<string, unknown>;
  if (!TABLES[kind] || !id || !payload) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  try {
    for (const k of Object.keys(payload)) if (typeof payload[k] === "string") payload[k] = (payload[k] as string).trim();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updated = await (prisma as any)[TABLES[kind].model].update({ where: { id }, data: payload });
    bustCache();
    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update." }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const kind = searchParams.get("kind") ?? "";
  const id = searchParams.get("id") ?? "";
  if (!TABLES[kind] || !id) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any)[TABLES[kind].model].delete({ where: { id } });
    bustCache();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 400 });
  }
}
