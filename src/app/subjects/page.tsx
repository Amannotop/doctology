import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import Link from "next/link";
import { SectionHeading, Icon } from "@/components/ui";
import { prisma } from "@/lib/db";
import { DEFAULT_SUBJECTS } from "@/lib/content";

export const metadata: Metadata = { title: "Subjects", description: "Explore Doctology subjects — Anatomy, Physiology, Biochemistry, Pathology, Pharmacology, Microbiology and more. Content managed via CMS.", alternates: { canonical: absoluteUrl("/subjects") } };

export default async function SubjectsPage() {
  let subjects = DEFAULT_SUBJECTS.map((s, i) => ({ id: String(i), ...s, status: "published" }));
  try {
    const db = await prisma.subject.findMany({ where: { status: "published" }, orderBy: { order: "asc" } });
    if (db.length) subjects = db as typeof subjects;
  } catch {}
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
      <SectionHeading level="h1" eyebrow="Subjects" title="Study by subject, progress by plan." sub="Browse the current library. Availability is managed in the CMS — new subjects appear automatically." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <Link key={s.id} href={`/subjects/${s.slug}`} className="card-hover rounded-3xl border border-[#DCE4EF] bg-white p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: s.color }}><Icon name={s.icon} /></span>
            <h2 className="mt-4 text-[18px] font-extrabold text-[#07111F]">{s.name}</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[#52627A]">{s.description}</p>
            <span className="mt-4 inline-flex font-bold text-[#1557C0]">Open subject →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const revalidate = 60;
