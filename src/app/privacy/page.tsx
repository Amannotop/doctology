import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: absoluteUrl("/privacy") } };
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[860px] px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#07111F]">Privacy Policy</h1>
      <p className="mt-2 text-[14px] text-[#52627A]">Placeholder — replace with legally reviewed policy.</p>
      <div className="prose-docto mt-6 rounded-3xl border border-[#DCE4EF] bg-white p-6 sm:p-8">
        <p>This is placeholder privacy content for Doctology. The site owner should replace this with a policy reviewed by legal counsel.</p>
        <h2>What we collect</h2>
        <p>Contact form submissions (name, email, message), and, if configured, analytics with consent.</p>
        <h2>How we use it</h2>
        <p>To respond to enquiries, improve the site, and manage CMS authentication (admin only).</p>
        <h2>Cookies</h2>
        <p>Essential cookies for admin sessions. Analytics cookies only with consent and when configured.</p>
        <p>Questions: use the <a href="/contact">contact page</a>.</p>
      </div>
    </div>
  );
}
