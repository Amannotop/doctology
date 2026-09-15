"use client";
import { useState } from "react";
import Link from "next/link";

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[#DCE4EF] overflow-hidden rounded-3xl border border-[#DCE4EF] bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7 sm:py-5"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="text-[16px] font-bold text-[#07111F]">{f.question}</span>
              <span aria-hidden className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${isOpen ? "rotate-45 border-[#1557C0] bg-[#1557C0] text-white" : "border-[#DCE4EF] text-[#52627A]"}`}>+</span>
            </button>
            {isOpen && (
              <p id={`faq-${i}`} className="px-5 pb-5 text-[15.5px] leading-relaxed text-[#52627A] sm:px-7">{f.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function CookieConsent() {
  return null;
}

export function ContactForm() {
  const [state, setState] = useState<{ loading: boolean; ok: string | null; err: string | null }>({ loading: false, ok: null, err: null });
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState({ loading: true, ok: null, err: null });
    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          subject: fd.get("subject"),
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setState({ loading: false, ok: "Thanks for reaching out. We'll get back to you soon.", err: null });
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setState({ loading: false, ok: null, err: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-[#DCE4EF] bg-white p-6 sm:p-8" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-[14px] font-bold">Name</label>
          <input id="cf-name" name="name" required minLength={2} maxLength={80} autoComplete="name" className="min-h-[48px] w-full rounded-xl border border-[#DCE4EF] px-4 text-[15px]" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-[14px] font-bold">Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className="min-h-[48px] w-full rounded-xl border border-[#DCE4EF] px-4 text-[15px]" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className="mb-1.5 block text-[14px] font-bold">Subject</label>
        <input id="cf-subject" name="subject" maxLength={120} className="min-h-[48px] w-full rounded-xl border border-[#DCE4EF] px-4 text-[15px]" placeholder="How can we help?" />
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-[14px] font-bold">Message</label>
        <textarea id="cf-message" name="message" required minLength={10} maxLength={5000} rows={5} className="w-full rounded-xl border border-[#DCE4EF] px-4 py-3 text-[15px]" placeholder="Tell us about your question..." />
      </div>
      {state.err && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14.5px] font-semibold text-[#B42318]">{state.err}</p>}
      {state.ok && <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-[14.5px] font-semibold text-[#0F766E]">{state.ok}</p>}
      <button disabled={state.loading} className="btn-press inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#1557C0] px-6 font-bold text-white hover:bg-[#124AA3] disabled:opacity-60">
        {state.loading ? "Sending…" : "Send message"}
      </button>
      <p className="text-[13px] text-[#52627A]">Prefer email? Write to us via the address configured in site settings.</p>
      <p className="text-[13px]">New here? <Link href="/faq" className="font-bold text-[#1557C0] underline">Read the FAQ first</Link></p>
    </form>
  );
}
