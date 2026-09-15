import Link from "next/link";
import { Button, SectionHeading, Icon } from "@/components/ui";
import { DashboardPreview, LessonPreview, FocusPreview } from "@/components/ProductPreview";
import { FAQAccordion } from "@/components/interactive";
import { prisma } from "@/lib/db";
import { DEFAULT_FEATURES, DEFAULT_SUBJECTS, DEFAULT_FAQS, DEFAULT_RESOURCES, DEFAULT_PLANS } from "@/lib/content";

async function getHomeData() {
  try {
    const [features, subjects, faqs, resources, plans] = await Promise.all([
      prisma.feature.findMany({ where: { enabled: true }, orderBy: { order: "asc" }, take: 8 }),
      prisma.subject.findMany({ where: { status: "published" }, orderBy: { order: "asc" }, take: 6 }),
      prisma.faq.findMany({ where: { published: true }, orderBy: { order: "asc" }, take: 6 }),
      prisma.resource.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" }, take: 3 }),
      prisma.pricingPlan.findMany({ where: { enabled: true }, orderBy: { ordering: "asc" } }),
    ]);
    return {
      features: features.length ? features : DEFAULT_FEATURES.map((f, i) => ({ id: String(i), ...f })),
      subjects: subjects.length ? subjects : DEFAULT_SUBJECTS.map((s, i) => ({ id: String(i), ...s, status: "published" as string })),
      faqs: faqs.length ? faqs : DEFAULT_FAQS.slice(0, 6).map((f, i) => ({ id: String(i), ...f })),
      resources: resources.length ? resources : DEFAULT_RESOURCES.slice(0, 3).map((r, i) => ({ id: String(i), ...r, author: r.author, category: r.category, readingTime: r.readingTime, image: null as string | null, publishedAt: null as Date | null, createdAt: new Date() })),
      plans: plans.length ? plans.map((p) => ({ ...p, features: p.features })) : DEFAULT_PLANS.map((p, i) => ({ id: String(i), ...p, badge: p.badge ?? null })),
    };
  } catch {
    return {
      features: DEFAULT_FEATURES.map((f, i) => ({ id: String(i), ...f })),
      subjects: DEFAULT_SUBJECTS.map((s, i) => ({ id: String(i), ...s, status: "published" as string })),
      faqs: DEFAULT_FAQS.slice(0, 6).map((f, i) => ({ id: String(i), ...f })),
      resources: DEFAULT_RESOURCES.slice(0, 3).map((r, i) => ({ id: String(i), ...r, author: r.author, category: r.category, readingTime: r.readingTime, image: null as string | null, publishedAt: null as Date | null, createdAt: new Date() })),
      plans: DEFAULT_PLANS.map((p, i) => ({ id: String(i), ...p, badge: p.badge ?? null })),
    };
  }
}

export default async function Home() {
  const { features, subjects, faqs, resources, plans } = await getHomeData();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#050B16] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(900px 480px at 80% -10%, rgba(21,87,192,0.45), transparent), radial-gradient(700px 420px at 10% 110%, rgba(20,184,166,0.18), transparent)" }} />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:pb-24 lg:pt-20">
          <div className="reveal">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] font-bold text-teal-300">
              ● Medical education, structured
            </p>
            <h1 className="mt-5 text-balance text-[42px] font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
              Study smarter.<br />
              <span className="font-display font-bold text-white">Build stronger</span><br />
              medical knowledge.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[17.5px] leading-relaxed text-[#B9C6DA]">
              Doctology brings lessons, questions, revision and exam preparation into one focused learning experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Start Learning <span aria-hidden>→</span></Button>
              <Link href="/features" className="btn-press inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/20 px-6 font-semibold text-white hover:bg-white/10">
                Explore Doctology
              </Link>
            </div>
            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 text-center sm:text-left">
              {[
                ["Calm", "focused UX"],
                ["Exam", "countdowns"],
                ["Daily", "study plans"],
              ].map(([a, b]) => (
                <div key={a} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                  <dt className="text-[15px] font-extrabold">{a}</dt>
                  <dd className="text-[13px] text-[#B9C6DA]">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="reveal mx-auto w-full max-w-[430px]">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section aria-label="Why Doctology" className="border-b border-[#DCE4EF] bg-white">
        <div className="mx-auto grid max-w-[1280px] gap-3 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            ["book", "Structured learning", "Follow a clear path instead of scattered PDFs."],
            ["check", "Exam-focused revision", "Revisit what matters before you forget it."],
            ["chart", "Practice questions", "Test understanding with explanations."],
            ["cap", "Designed for medical students", "Calm, academic and distraction-free."],
          ].map(([icon, t, d]) => (
            <div key={t} className="flex gap-3.5 rounded-2xl border border-[#DCE4EF] bg-[#F5F8FC] p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#07111F] text-teal-300"><Icon name={icon} /></span>
              <div><p className="font-bold text-[#07111F]">{t}</p><p className="mt-0.5 text-[14px] text-[#52627A]">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="The problem" title="Medical education is complex. Your study system shouldn't be." sub="Too many resources, scattered notes, inconsistent revision and unclear priorities make exam prep harder than it needs to be." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-[#DCE4EF] bg-white p-7">
            <p className="text-[13px] font-bold uppercase tracking-widest text-[#B42318]">Without Doctology</p>
            <ol className="mt-4 space-y-2.5 text-[15.5px] font-semibold text-[#52627A]">
              {["Resources", "Notes", "Questions", "Revision", "Confusion"].map((s, i, a) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-red-50 text-[13px] font-bold text-[#B42318]">{i + 1}</span> {s}
                  {i < a.length - 1 && <span aria-hidden className="text-[#C4CFE1]">↓</span>}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl bg-[#07111F] p-7 text-white">
            <p className="text-[13px] font-bold uppercase tracking-widest text-teal-300">With Doctology</p>
            <ol className="mt-4 space-y-2.5 text-[15.5px] font-semibold">
              {["Learn", "Practice", "Review", "Revise", "Improve"].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-500/20 text-[13px] font-bold text-teal-300">{i + 1}</span> {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16 lg:py-24" aria-labelledby="features-h">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <SectionHeading eyebrow="Features" title="Everything you need to learn, practise and revise in one place." sub="A focused toolkit — not ten tabs, not five apps, not a pile of PDFs." />
          <div id="features-h" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f: { id: string; title: string; description: string; icon: string }) => (
              <article key={f.id} className="card-hover rounded-3xl border border-[#DCE4EF] bg-[#F5F8FC] p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#07111F] text-teal-300"><Icon name={f.icon} /></span>
                <h3 className="mt-4 text-[18px] font-extrabold text-[#07111F]">{f.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#52627A]">{f.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center"><Link href="/features" className="font-bold text-[#1557C0] link-underline">See all features →</Link></p>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:py-24" aria-label="How Doctology works">
        <SectionHeading eyebrow="Workflow" title="Plan. Learn. Practice. Revise. Improve." sub="One continuous loop that keeps you moving forward every day." />
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {[
            ["01", "Plan", "Today's tasks, durations and priorities."],
            ["02", "Learn", "Focused lessons with video + notes."],
            ["03", "Practice", "Questions with explanations."],
            ["04", "Revise", "Spaced review of weak topics."],
            ["05", "Improve", "Track progress and adjust."],
          ].map(([n, t, d]) => (
            <li key={n} className="rounded-3xl border border-[#DCE4EF] bg-white p-5">
              <p className="font-display text-[28px] font-bold text-[#0F766E]">{n}</p>
              <p className="mt-1 font-extrabold text-[#07111F]">{t}</p>
              <p className="mt-1 text-[14.5px] text-[#52627A]">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
          <LessonPreview />
          <div>
            <h3 className="text-2xl font-extrabold text-[#07111F]">A lesson experience designed for focus</h3>
            <p className="mt-3 text-[16.5px] leading-relaxed text-[#52627A]">Clear headings, official content with supporting notes, video where it helps, and root-word breakdowns that make terminology stick — like Osteology, from <em>osteon</em> (bone) + <em>-logy</em> (study of).</p>
            <div className="mt-5 flex gap-3"><Button href="/subjects/anatomy">Browse subjects</Button></div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="bg-[#050B16] py-16 text-white lg:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionHeading dark align="left" eyebrow="Student app preview" title="Wake up knowing exactly what to study." sub="Demo preview with fictional data. Countdown, today's session and plan — all in one calm home screen." />
            <ul className="mt-6 space-y-3 text-[15.5px] text-[#B9C6DA]">
              {["“42 days to exam” keeps timelines actionable", "“Start session” begins a 30-minute focused block", "“Today's plan” tracks 0/5 → 5/5 completion"].map((t) => (
                <li key={t} className="flex gap-2.5"><span className="text-teal-300">✓</span> {t}</li>
              ))}
            </ul>
            <div className="mt-7 flex gap-3">
              <Button href="/how-it-works">See how it works</Button>
              <Link href="/subjects" className="btn-press inline-flex min-h-[48px] items-center rounded-full border border-white/20 px-6 font-semibold hover:bg-white/10">Explore subjects</Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[430px]"><DashboardPreview /></div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Subjects" title="Start with the foundations." sub="Core medical subjects, organised for progressive learning. Managed via CMS — availability updates automatically." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s: { id: string; name: string; slug: string; description: string; icon: string; color: string; featured?: boolean }) => (
            <Link key={s.id} href={`/subjects/${s.slug}`} className="card-hover group rounded-3xl border border-[#DCE4EF] bg-white p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: s.color }}><Icon name={s.icon} /></span>
              <h3 className="mt-4 flex items-center gap-2 text-[18px] font-extrabold text-[#07111F]">
                {s.name}
                {s.featured && <span className="rounded-full bg-teal-500/15 px-2.5 py-0.5 text-[11.5px] font-bold text-[#0F766E]">Featured</span>}
              </h3>
              <p className="mt-1.5 text-[15px] text-[#52627A]">{s.description}</p>
              <p className="mt-3 font-bold text-[#1557C0]">Open subject <span aria-hidden className="transition group-hover:translate-x-1">→</span></p>
            </Link>
          ))}
        </div>
      </section>

      {/* FOCUS TIMER */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <FocusPreview />
          <div>
            <SectionHeading align="left" eyebrow="Focus" title="45 minutes of real progress." sub="Pick a duration, press Start focus, and link time to your plan. If you're behind, replan — don't guilt-spiral." />
            <div className="mt-6 flex gap-3"><Button href="/features">Explore focus tools</Button></div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:py-24">
        <SectionHeading eyebrow="Resources" title="Study guides that respect your time." sub="Practical, responsibly written guidance on routines, recall and exam prep." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {resources.map((r: { id: string; title: string; slug: string; excerpt: string; category: string; readingTime: number }) => (
            <Link key={r.id} href={`/resources/${r.slug}`} className="card-hover rounded-3xl border border-[#DCE4EF] bg-white p-6">
              <p className="inline-block rounded-full bg-[#EAF1FC] px-3 py-1 text-[12px] font-bold text-[#1557C0]">{r.category} · {r.readingTime} min</p>
              <h3 className="mt-3 text-[18px] font-extrabold leading-snug text-[#07111F]">{r.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#52627A]">{r.excerpt}</p>
              <p className="mt-3 font-bold text-[#1557C0]">Read guide →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="mx-auto max-w-[1280px] px-4 pb-16 sm:px-6">
        <div className="rounded-[32px] bg-[#07111F] p-8 text-white sm:p-12">
          <SectionHeading dark align="left" eyebrow="Pricing" title="Simple plans, honest pricing." sub="No invented prices. Plans are managed in the CMS and marked clearly when still in early access." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {plans.map((p: { id: string; name: string; price: string; description: string; highlighted?: boolean; badge?: string | null }) => (
              <div key={p.id} className={`rounded-3xl p-6 ${p.highlighted ? "bg-[#1557C0]" : "bg-white/5 border border-white/10"}`}>
                {p.badge && <p className="mb-2 inline-block rounded-full bg-white px-3 py-1 text-[12px] font-bold text-[#1557C0]">{p.badge}</p>}
                <p className="font-extrabold">{p.name}</p>
                <p className="font-display mt-1 text-3xl font-bold">{p.price}</p>
                <p className="mt-2 text-[14px] opacity-80">{p.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8"><Button href="/pricing">See pricing details</Button></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[880px] px-4 pb-16 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <div className="mt-8"><FAQAccordion items={faqs.map((f: { question: string; answer: string }) => ({ question: f.question, answer: f.answer }))} /></div>
        <p className="mt-5 text-center"><Link href="/faq" className="font-bold text-[#1557C0] link-underline">View all FAQs →</Link></p>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1280px] px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-[#1557C0] px-8 py-14 text-center text-white sm:px-12">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold sm:text-5xl">Your next study session starts here.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-white/85">Build a better learning routine with Doctology. Learn, practise, revise — calmly.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-press inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-8 font-bold text-[#1557C0]">Get Started</Link>
            <Link href="/about" className="btn-press inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/30 px-8 font-bold hover:bg-white/10">More about Doctology</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export const revalidate = 60;
