import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { DEFAULT_FAQS } from "@/lib/content";
import { SectionHeading } from "@/components/ui";
import { FAQAccordion } from "@/components/interactive";

export const metadata: Metadata = { title: "FAQ", description: "Frequently asked questions about Doctology — subjects, exams, revision, pricing and getting started.", alternates: { canonical: absoluteUrl("/faq") } };

export default async function FaqPage() {
  let faqs = DEFAULT_FAQS.map((f, i) => ({ id: String(i), question: f.question, answer: f.answer }));
  try {
    const db = await prisma.faq.findMany({ where: { published: true }, orderBy: { order: "asc" } });
    if (db.length) faqs = db.map((f) => ({ id: f.id, question: f.question, answer: f.answer }));
  } catch {}

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <div className="mx-auto max-w-[880px] px-4 py-14 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeading level="h1" eyebrow="FAQ" title="Questions, answered clearly." sub="Everything you need to know before you start." />
      <div className="mt-8"><FAQAccordion items={faqs} /></div>
    </div>
  );
}

export const revalidate = 60;
