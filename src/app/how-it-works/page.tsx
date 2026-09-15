import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "How It Works", description: "Create your account, choose subjects, follow your study plan, complete lessons, practise questions, revise and track progress.", alternates: { canonical: absoluteUrl("/how-it-works") } };

const STEPS = [
  { n: "01", t: "Create your account", d: "Sign in to the Doctology student app. Your plan, progress and revision travel with you." },
  { n: "02", t: "Choose your subjects", d: "Pick Anatomy, Physiology, Biochemistry and more. The CMS controls what’s currently available." },
  { n: "03", t: "Follow your study plan", d: "Know exactly what to study next. One 30-minute session at a time — no decision fatigue." },
  { n: "04", t: "Complete lessons", d: "Focused lessons with clear headings, notes and video where it helps." },
  { n: "05", t: "Practice questions", d: "Test understanding immediately with exam-style questions and explanations." },
  { n: "06", t: "Revise", d: "Review what you’ve learned before you forget it. Spaced revision keeps knowledge fresh." },
  { n: "07", t: "Track progress", d: "See completion, streaks and coverage. Adjust the plan when you fall behind — replan, don’t spiral." },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6">
      <SectionHeading level="h1" eyebrow="How it works" title="A calm loop you can follow every day." sub="From account to improvement — seven clear steps." />
      <ol className="mt-10 grid gap-4 md:grid-cols-2" aria-label="Steps">
        {STEPS.map((s) => (
          <li key={s.n} className="rounded-3xl border border-[#DCE4EF] bg-white p-6">
            <p className="font-display text-2xl font-bold text-[#0F766E]">{s.n}</p>
            <h2 className="mt-1 text-[18px] font-extrabold text-[#07111F]">{s.t}</h2>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[#52627A]">{s.d}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 rounded-3xl bg-[#07111F] p-8 text-center text-white">
        <h2 className="text-2xl font-extrabold">Start with one session today.</h2>
        <p className="mx-auto mt-2 max-w-xl text-[#B9C6DA]">Choose a lecture task, set 45 minutes, and press Start focus. Link time to your plan so analytics stay honest.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/contact" className="rounded-full bg-[#1557C0] px-6 py-3 font-bold">Get Started</Link>
          <Link href="/subjects" className="rounded-full border border-white/20 px-6 py-3 font-bold hover:bg-white/10">Browse subjects</Link>
        </div>
      </div>
    </div>
  );
}
