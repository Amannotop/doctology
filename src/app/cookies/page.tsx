import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Cookie Policy", alternates: { canonical: absoluteUrl("/cookies") } };
export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-[860px] px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-[#07111F]">Cookie Policy</h1>
      <p className="mt-2 text-[14px] text-[#52627A]">Placeholder — replace with legally reviewed policy.</p>
      <div className="prose-docto mt-6 rounded-3xl border border-[#DCE4EF] bg-white p-6 sm:p-8">
        <h2>Essential cookies</h2>
        <p>Admin session cookie (<code>docto_admin</code>) — required for the CMS. HttpOnly, Secure, SameSite=Lax.</p>
        <h2>Analytics cookies</h2>
        <p>Only loaded when an analytics ID is configured in site settings and where required, after consent.</p>
        <h2>Managing cookies</h2>
        <p>Use your browser settings to clear cookies. Clearing the admin cookie logs you out.</p>
      </div>
    </div>
  );
}
