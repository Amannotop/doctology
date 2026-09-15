import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import Link from "next/link";
import { SectionHeading } from "@/components/ui";
import { prisma } from "@/lib/db";
import { DEFAULT_PLANS } from "@/lib/content";

export const metadata: Metadata = { title: "Pricing", description: "Simple, honest pricing for Doctology. Plans managed via CMS — no fake prices.", alternates: { canonical: absoluteUrl("/pricing") } };

export default async function PricingPage() {
  let plans = DEFAULT_PLANS.map((p, i) => ({ id: String(i), ...p, badge: p.badge ?? null, highlighted: p.highlighted }));
  try {
    const db = await prisma.pricingPlan.findMany({ where: { enabled: true }, orderBy: { ordering: "asc" } });
    if (db.length) plans = db.map((p) => ({ id: p.id, name: p.name, price: p.price, interval: p.interval, description: p.description, features: p.features, cta: p.cta, highlighted: p.highlighted, badge: p.badge, ordering: p.ordering, enabled: p.enabled }));
  } catch {}

  function featuresFor(p: { features: string }): string[] {
    try { const v = JSON.parse(p.features); return Array.isArray(v) ? v : []; } catch { return []; }
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
      <SectionHeading level="h1" eyebrow="Pricing" title="Honest pricing. No invented numbers." sub="Plans are managed in the CMS. If pricing is not finalized, the site shows “Coming soon” instead of fake prices." />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.id} className={`relative flex flex-col rounded-[32px] border p-7 ${p.highlighted ? "border-[#1557C0] bg-[#07111F] text-white shadow-2xl" : "border-[#DCE4EF] bg-white"}`}>
            {p.badge && <span className="absolute -top-3 left-6 rounded-full bg-[#0F766E] px-3 py-1 text-[12px] font-bold text-white">{p.badge}</span>}
            <h2 className={`text-[18px] font-extrabold ${p.highlighted ? "text-white" : "text-[#07111F]"}`}>{p.name}</h2>
            <p className="font-display mt-2 text-4xl font-bold">{p.price} <span className="text-[15px] font-normal opacity-70">{p.interval}</span></p>
            <p className={`mt-2 text-[14.5px] ${p.highlighted ? "text-[#B9C6DA]" : "text-[#52627A]"}`}>{p.description}</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-[14.5px]">
              {featuresFor(p).map((f) => (
                <li key={f} className="flex gap-2"><span className={p.highlighted ? "text-teal-300" : "text-[#0F766E]"}>✓</span> <span className={p.highlighted ? "text-white/90" : "text-[#17233A]"}>{f}</span></li>
              ))}
            </ul>
            <Link href="/contact" className={`mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full font-bold ${p.highlighted ? "bg-[#1557C0] text-white" : "bg-[#07111F] text-white"}`}>{p.cta}</Link>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-[13.5px] text-[#52627A]">Questions? See <Link href="/faq" className="font-bold text-[#1557C0] underline">FAQ</Link> or <Link href="/contact" className="font-bold text-[#1557C0] underline">contact us</Link>.</p>
    </div>
  );
}

export const revalidate = 60;
