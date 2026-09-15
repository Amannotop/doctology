import { Icon } from "./ui";

// Polished product mockups derived from screenshots — fictional demo data.
export function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07111F] text-white shadow-2xl" role="img" aria-label="Preview of the Doctology student dashboard showing exam countdown and today's plan">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10"><Icon name="cap" className="h-4 w-4 text-teal-300" /></span>
          <span className="text-sm font-bold">Doctology</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Icon name="search" className="h-4 w-4" /></span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Icon name="bell" className="h-4 w-4" /></span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1557C0] text-[11px] font-bold">HA</span>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <p className="text-[13px] text-white/60">Tuesday · 8 September</p>
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[13.5px] font-semibold">
          <Icon name="calendar" className="h-4 w-4 text-teal-300" /> 42 days to exam
        </div>
        <div className="rounded-2xl bg-white p-5 text-[#07111F]">
          <p className="text-[13.5px] text-[#52627A]">Welcome back, Hajaj.</p>
          <p className="font-display mt-1 text-[26px] font-bold">Muscular system</p>
          <p className="mt-1 text-[13.5px] text-[#52627A]">Scheduled for today · 30 min</p>
          <span className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#1557C0] py-3 text-[15px] font-bold text-white">
            <Icon name="play" className="h-4 w-4" /> Start session →
          </span>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <p className="font-bold">Today&apos;s plan</p>
            <p className="text-[13px] text-white/60">0/5 done</p>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d1c33] p-3.5">
            <span className="h-5 w-5 rounded-full border-2 border-white/40" />
            <div>
              <p className="text-[14px] font-semibold">Second week of development</p>
              <p className="text-[12.5px] text-white/60">30 min · video</p>
            </div>
          </div>
          <p className="mt-3 text-right text-[13px] font-bold text-teal-300">View full plan →</p>
        </div>
        <div className="grid grid-cols-5 gap-1 rounded-2xl bg-white/5 p-2 text-center text-[11px]">
          {["Home", "Lessons", "Questions", "Revision", "More"].map((t, i) => (
            <span key={t} className={i === 0 ? "rounded-xl bg-white/10 py-2 font-bold" : "py-2 text-white/60"}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LessonPreview() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#050B16] text-white shadow-2xl" role="img" aria-label="Preview of a Doctology lesson about osteology">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-[13px] text-teal-300">📖 The Skeleton, Classification &amp; Growth</p>
      </div>
      <div className="p-5">
        <div className="grid place-items-center rounded-2xl bg-white/5 py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1557C0] px-6 py-3.5 font-bold">🎬 Open video ⧉</span>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-teal-500/20 px-4 py-1.5 text-[13px] font-bold text-teal-300">🏛 Official</span>
          <span className="rounded-full bg-white/5 px-4 py-1.5 text-[13px] text-white/70">Doctology Notes ●</span>
        </div>
        <p className="mt-5 text-[26px] font-extrabold">I. Introduction to Osteology</p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">The study of bone is termed <strong className="text-white">Osteology</strong>. The adult human skeleton consists of more than 200 separate bones.</p>
        <div className="mt-4 rounded-2xl bg-teal-500/10 p-4 text-[14px]">
          <p className="font-bold text-teal-200">ⓘ Doctology Root-ology</p>
          <p className="mt-1.5">▪ <strong>Osteo-:</strong> Refers to bone (Greek osteon).</p>
          <p>▪ <strong>-ology:</strong> Study of.</p>
        </div>
      </div>
    </div>
  );
}

export function FocusPreview() {
  return (
    <div className="rounded-[28px] border border-[#DCE4EF] bg-white p-6 shadow-xl" role="img" aria-label="Preview of the Doctology focus timer set to 45 minutes">
      <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#52627A]">Focus timer</p>
      <p className="mt-1 font-bold text-[#07111F]">Choose a lecture task</p>
      <div className="mx-auto mt-5 grid h-52 w-52 place-items-center rounded-full border-[10px] border-[#0F766E]">
        <p className="text-[44px] font-extrabold tabular-nums">45:00</p>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {["15m", "25m", "45m", "60m"].map((t) => (
          <span key={t} className={t === "45m" ? "rounded-full bg-[#07111F] px-4 py-2 text-[13px] font-bold text-white" : "rounded-full border border-[#DCE4EF] px-4 py-2 text-[13px] text-[#52627A]"}>{t}</span>
        ))}
      </div>
      <span className="mt-5 flex items-center justify-center rounded-full bg-[#1557C0] py-3.5 font-bold text-white">Start focus</span>
    </div>
  );
}
