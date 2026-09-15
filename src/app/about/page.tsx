import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "About", description: "About Doctology — mission, philosophy and what we’re building for medical students.", alternates: { canonical: absoluteUrl("/about") } };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[860px] px-4 py-14 sm:px-6">
      <SectionHeading level="h1" align="left" eyebrow="About" title="Doctology understands how difficult studying medicine can be." sub="And gives students a calm, structured place to learn." />
      <div className="prose-docto mt-10 rounded-3xl border border-[#DCE4EF] bg-white p-6 sm:p-8">
        <h2>Mission</h2>
        <p>Help medical and health-science students learn consistently, revise efficiently and approach exams with clarity — not last-minute panic.</p>
        <h2>Vision</h2>
        <p>A single, premium learning experience that replaces scattered resources with structure: lessons, questions, revision and plans that respect your time and attention.</p>
        <h2>Educational philosophy</h2>
        <ul>
          <li><strong>Structure beats volume.</strong> Knowing what to study next matters as much as having the material.</li>
          <li><strong>Recall cements learning.</strong> Practising questions immediately after lessons reveals gaps early.</li>
          <li><strong>Revision is maintenance.</strong> Small, regular reviews beat occasional marathons.</li>
          <li><strong>Calm design supports focus.</strong> No loud marketing, no dark patterns — just readable, spacious, distraction-free study.</li>
        </ul>
        <h2>What we’re building</h2>
        <p>Doctology is being built as a long-term home for medical learning — extensible to student accounts, subscriptions, educator tools and more, without over-engineering today.</p>
        <blockquote>Doctology is an educational platform and is not a substitute for professional medical advice, diagnosis or treatment.</blockquote>
      </div>
    </div>
  );
}
