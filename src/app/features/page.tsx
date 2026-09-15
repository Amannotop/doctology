import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { SectionHeading, Icon } from "@/components/ui";
import { prisma } from "@/lib/db";
import { DEFAULT_FEATURES } from "@/lib/content";

export const metadata: Metadata = { title: "Features", description: "Lessons, questions, revision, study plans, exam countdown and progress — everything Doctology provides in one focused experience.", alternates: { canonical: absoluteUrl("/features") } };

export default async function FeaturesPage() {
  let features = DEFAULT_FEATURES;
  try {
    const db = await prisma.feature.findMany({ where: { enabled: true }, orderBy: { order: "asc" } });
    if (db.length) features = db;
  } catch { /* fallback */ }

  const extra = [
    { title: "Search", description: "Quickly find lessons, topics and guides across your library.", icon: "search" },
    { title: "Ask / Learning Assistant", description: "Coming soon — contextual help linked to the lesson you're studying.", icon: "cap" },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
      <SectionHeading level="h1" eyebrow="Features" title="A focused toolkit for medical learning." sub="Every feature exists to reduce friction: know what to study, study it well, and remember it longer." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...features, ...extra].map((f, i) => (
          <article key={i} className="card-hover rounded-3xl border border-[#DCE4EF] bg-white p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#07111F] text-teal-300"><Icon name={f.icon} /></span>
            <h2 className="mt-4 text-[18px] font-extrabold">{f.title}</h2>
            <p className="mt-1.5 text-[15px] text-[#52627A] leading-relaxed">{f.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export const revalidate = 60;
