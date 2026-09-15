import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { DEFAULT_RESOURCES, renderMarkdown } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export async function generateStaticParams() {
  return DEFAULT_RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let r: { title: string; excerpt: string } | null = DEFAULT_RESOURCES.find((x) => x.slug === slug) ?? null;
  try {
    const db = await prisma.resource.findUnique({ where: { slug } });
    if (db) {
      if (db.status !== "published") return { title: "Not found" };
      r = { title: db.title, excerpt: db.excerpt };
    }
  } catch {}
  if (!r) return { title: "Not found" };
  return {
    title: r.title,
    description: r.excerpt,
    alternates: { canonical: absoluteUrl(`/resources/${slug}`) },
    openGraph: { title: r.title, description: r.excerpt, type: "article", url: absoluteUrl(`/resources/${slug}`), images: [{ url: "/og-image.png", width: 1200, height: 630, alt: r.title }] },
    twitter: { card: "summary_large_image", title: r.title, description: r.excerpt, images: ["/og-image.png"] },
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let resource: { title: string; slug: string; excerpt: string; content: string; author: string; category: string; readingTime: number; createdAt: Date; publishedAt?: Date | null } | null =
    (DEFAULT_RESOURCES.find((x) => x.slug === slug) as unknown as typeof resource) ?? null;
  try {
    const db = await prisma.resource.findUnique({ where: { slug } });
    if (db) {
      // Drafts/archived resources must never render publicly.
      if (db.status !== "published") notFound();
      resource = { title: db.title, slug: db.slug, excerpt: db.excerpt, content: db.content, author: db.author, category: db.category, readingTime: db.readingTime, createdAt: db.createdAt, publishedAt: db.publishedAt };
    }
    // If no DB row, the default fallback stands in (DB unreachable or unseeded).
  } catch {}
  if (!resource) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    author: { "@type": "Person", name: resource.author },
    datePublished: (resource.publishedAt ?? resource.createdAt).toISOString?.() ?? new Date().toISOString(),
    description: resource.excerpt,
    mainEntityOfPage: absoluteUrl(`/resources/${slug}`),
  };

  return (
    <article className="mx-auto max-w-[860px] px-4 py-14 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/resources" className="font-bold text-[#1557C0]">← All resources</Link>
      <p className="mt-4 inline-block rounded-full bg-[#EAF1FC] px-3 py-1 text-[12px] font-bold text-[#1557C0]">{resource.category} · {resource.readingTime} min read</p>
      <h1 className="mt-3 text-balance text-3xl font-extrabold leading-tight tracking-tight text-[#07111F] sm:text-5xl">{resource.title}</h1>
      <p className="mt-3 text-[15px] text-[#52627A]">By {resource.author} · {new Date(resource.publishedAt ?? resource.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
      <p className="mt-4 text-[18px] leading-relaxed text-[#17233A]">{resource.excerpt}</p>
      <div className="prose-docto mt-8 rounded-3xl border border-[#DCE4EF] bg-white p-6 sm:p-8" dangerouslySetInnerHTML={{ __html: renderMarkdown(resource.content) }} />
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-[13.5px] text-[#7A5A10]">
        Doctology is an educational platform and is not a substitute for professional medical advice.
      </div>
    </article>
  );
}

export const revalidate = 60;
