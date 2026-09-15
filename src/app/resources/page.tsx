import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { DEFAULT_RESOURCES } from "@/lib/content";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Resources", description: "Study guides, exam preparation and learning tips from the Doctology team.", alternates: { canonical: absoluteUrl("/resources") } };

export default async function ResourcesPage({ searchParams }: { searchParams: Promise<{ q?: string; cat?: string }> }) {
  const { q, cat } = await searchParams;
  let resources = DEFAULT_RESOURCES.map((r, i) => ({ id: String(i), ...r, image: null as string | null, createdAt: new Date() }));
  try {
    const where: Record<string, unknown> = { status: "published" };
    if (cat) where.category = cat;
    if (q) where.OR = [{ title: { contains: q } }, { excerpt: { contains: q } }, { category: { contains: q } }];
    const db = await prisma.resource.findMany({ where: where as never, orderBy: { createdAt: "desc" } });
    if (db.length || q || cat) resources = db.map((r) => ({ ...r, image: (r as { image: string | null }).image })) as typeof resources;
    // if no DB results and no filter, keep defaults
    if (!db.length && !q && !cat) {
      // keep defaults
    } else if (q || cat) {
      // already set to db (possibly empty)
    }
  } catch {
    if (q) {
      const term = q.toLowerCase();
      resources = resources.filter((r) => r.title.toLowerCase().includes(term) || r.excerpt.toLowerCase().includes(term) || r.category.toLowerCase().includes(term));
    }
    if (cat) resources = resources.filter((r) => r.category === cat);
  }

  const cats = ["Study Guide", "Learning Tips", "Exam Prep", "Revision"];
  const categories = Array.from(new Set([...cats, ...resources.map((r) => r.category)]));

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
      <SectionHeading level="h1" eyebrow="Resources" title="Guides worth your study time." sub="Search and filter — CMS-powered, so new guides publish instantly." />
      <form className="mt-8 flex flex-col gap-3 sm:flex-row" action="/resources" method="GET">
        <label className="flex-1">
          <span className="sr-only">Search</span>
          <input name="q" defaultValue={q ?? ""} placeholder="Search guides…" className="min-h-[48px] w-full rounded-full border border-[#DCE4EF] bg-white px-5 text-[15px]" />
        </label>
        <select name="cat" defaultValue={cat ?? ""} className="min-h-[48px] rounded-full border border-[#DCE4EF] bg-white px-5 text-[15px]">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="min-h-[48px] rounded-full bg-[#07111F] px-6 font-bold text-white">Search</button>
      </form>

      {resources.length === 0 ? (
        <p className="mt-10 rounded-3xl border border-dashed border-[#DCE4EF] bg-white p-10 text-center text-[#52627A]">No resources match your search. Try a different term or category.</p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {resources.map((r) => (
            <Link key={r.id} href={`/resources/${r.slug}`} className="card-hover rounded-3xl border border-[#DCE4EF] bg-white p-6">
              <p className="inline-block rounded-full bg-[#EAF1FC] px-3 py-1 text-[12px] font-bold text-[#1557C0]">{r.category} · {r.readingTime} min</p>
              <h2 className="mt-3 text-[18px] font-extrabold leading-snug text-[#07111F]">{r.title}</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#52627A]">{r.excerpt}</p>
              <span className="mt-3 inline-block font-bold text-[#1557C0]">Read guide →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export const revalidate = 60;
