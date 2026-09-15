import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui";
import { prisma } from "@/lib/db";
import { DEFAULT_SUBJECTS } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export async function generateStaticParams() {
  return DEFAULT_SUBJECTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let subject: { name: string; description: string } | null = DEFAULT_SUBJECTS.find((s) => s.slug === slug) ?? null;
  try {
    const db = await prisma.subject.findUnique({ where: { slug } });
    if (db) {
      if (db.status !== "published") return { title: "Subject not found" };
      subject = db;
    }
  } catch {}
  if (!subject) return { title: "Subject not found" };
  return {
    title: subject.name,
    description: subject.description,
    alternates: { canonical: absoluteUrl(`/subjects/${slug}`) },
    openGraph: { title: subject.name, description: subject.description, url: absoluteUrl(`/subjects/${slug}`), images: [{ url: "/og-image.png", width: 1200, height: 630, alt: subject.name }] },
  };
}

export default async function SubjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let subject: { name: string; slug: string; description: string; icon: string; color: string } | null = DEFAULT_SUBJECTS.find((s) => s.slug === slug) ?? null;
  try {
    const db = await prisma.subject.findUnique({ where: { slug } });
    if (db) {
      // Drafts/archived subjects must never render publicly.
      if (db.status !== "published") notFound();
      subject = { name: db.name, slug: db.slug, description: db.description, icon: db.icon, color: db.color };
    }
    // If no DB row, the default fallback stands in (DB unreachable or unseeded).
  } catch {}
  if (!subject) notFound();

  const lessons = [
    { title: `Introduction to ${subject.name}`, duration: "30 min", tag: "Lesson" },
    { title: `${subject.name} — Core Concepts`, duration: "45 min", tag: "Lesson" },
    { title: `${subject.name} Practice Set`, duration: "20 min", tag: "Questions" },
    { title: `${subject.name} Revision Pack`, duration: "15 min", tag: "Revision" },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
      <Link href="/subjects" className="font-bold text-[#1557C0]">← All subjects</Link>
      <div className="mt-4 flex gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: subject.color }}><Icon name={subject.icon} className="h-6 w-6" /></span>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#07111F] sm:text-4xl">{subject.name}</h1>
          <p className="mt-2 max-w-2xl text-[16.5px] leading-relaxed text-[#52627A]">{subject.description}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-[#DCE4EF] bg-white p-6">
        <h2 className="text-[18px] font-extrabold">What you’ll study</h2>
        <p className="mt-1 text-[15px] text-[#52627A]">Structured lessons, practice questions and revision — all organised for this subject. Your study plan knows where you left off.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {lessons.map((l) => (
            <div key={l.title} className="rounded-2xl border border-[#EDF2F9] bg-[#F5F8FC] p-4">
              <p className="inline-block rounded-full bg-[#07111F] px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-teal-300">{l.tag} · {l.duration}</p>
              <p className="mt-2 font-bold text-[#07111F]">{l.title}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[13.5px] text-[#52627A]">Topic content is managed through the CMS at <code className="rounded bg-black/5 px-1.5 py-0.5">/admin</code>. Lesson pages can be added per subject without code changes.</p>
      </div>

      <div className="mt-8 rounded-3xl bg-[#07111F] p-8 text-white">
        <h2 className="text-xl font-extrabold">Keep the streak going</h2>
        <p className="mt-2 text-[#B9C6DA]">Follow your plan for {subject.name} — one 30-minute session at a time.</p>
        <Link href="/how-it-works" className="mt-5 inline-flex rounded-full bg-[#1557C0] px-6 py-3 font-bold">See how it works</Link>
      </div>
    </div>
  );
}

export const revalidate = 60;
