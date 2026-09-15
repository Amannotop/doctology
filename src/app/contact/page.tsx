import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/interactive";

export const metadata: Metadata = { title: "Contact", description: "Contact the Doctology team. We’ll get back to you soon.", alternates: { canonical: absoluteUrl("/contact") } };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6">
      <SectionHeading level="h1" align="left" eyebrow="Contact" title="We’d love to hear from you." sub="Have a question about Doctology, subjects or your study workflow? Send a message — server-side validated, spam-protected, and stored securely." />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#DCE4EF] bg-white p-6">
            <h2 className="font-extrabold">Contact details</h2>
            <p className="mt-2 text-[15px] text-[#52627A]">Response time is usually within 1–2 business days. Contact email is configurable in Admin → Settings.</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li><strong>Email:</strong> configured via <code className="rounded bg-black/5 px-1.5 py-0.5">Site settings</code></li>
              <li><strong>Support:</strong> via this form (recommended)</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-[#07111F] p-6 text-white">
            <h2 className="font-extrabold">Prefer to browse?</h2>
            <p className="mt-2 text-[#B9C6DA]">Most questions are answered in the FAQ and How It Works guides.</p>
            <div className="mt-4 flex gap-2">
              <a href="/faq" className="rounded-full bg-white px-5 py-2.5 font-bold text-[#07111F]">FAQ</a>
              <a href="/how-it-works" className="rounded-full border border-white/20 px-5 py-2.5 font-bold">How it works</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
