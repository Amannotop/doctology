import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: absoluteUrl("/terms") } };
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[860px] px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#07111F]">Terms of Service</h1>
      <p className="mt-2 text-[14px] text-[#52627A]">Placeholder — replace with legally reviewed terms.</p>
      <div className="prose-docto mt-6 rounded-3xl border border-[#DCE4EF] bg-white p-6 sm:p-8">
        <p>Placeholder terms for Doctology. Have these reviewed before public launch.</p>
        <h2>Educational use</h2>
        <p>Content is educational and is not a substitute for professional medical advice, diagnosis or treatment.</p>
        <h2>Acceptable use</h2>
        <p>Do not abuse forms, attempt to bypass authentication, or upload malicious content.</p>
        <h2>Contact</h2>
        <p>Questions: <a href="/contact">contact us</a>.</p>
      </div>
    </div>
  );
}
