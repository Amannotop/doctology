import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminClient from "./AdminClient";
import LogoutButton from "./LogoutButton";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  let stats = { subjects: 0, resources: 0, faqs: 0, features: 0, messages: 0 };
  try {
    const [subjects, resources, faqs, features, messages] = await Promise.all([
      prisma.subject.count(),
      prisma.resource.count(),
      prisma.faq.count(),
      prisma.feature.count(),
      prisma.contactMessage.count(),
    ]);
    stats = { subjects, resources, faqs, features, messages };
  } catch {}

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-widest text-[#0F766E]">Admin</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#07111F]">CMS Dashboard</h1>
          <p className="mt-1 text-[14px] text-[#52627A]">Logged in as <strong>{session.email}</strong>. Content is stored in the database and rendered live on the public site.</p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-5">
        {[
          ["Subjects", stats.subjects],
          ["Resources", stats.resources],
          ["FAQs", stats.faqs],
          ["Features", stats.features],
          ["Messages", stats.messages],
        ].map(([label, val]) => (
          <div key={label} className="rounded-2xl border border-[#DCE4EF] bg-white p-5">
            <p className="text-[12px] font-bold uppercase tracking-widest text-[#52627A]">{label}</p>
            <p className="mt-1 text-3xl font-extrabold text-[#07111F]">{String(val)}</p>
          </div>
        ))}
      </div>

      <nav className="mt-6 flex flex-wrap gap-2 text-[14px] font-bold">
        <a href="/admin" className="rounded-full bg-[#07111F] px-4 py-2 text-white">Overview</a>
        <a href="/admin/subjects" className="rounded-full border border-[#DCE4EF] bg-white px-4 py-2">Subjects</a>
        <a href="/admin/resources" className="rounded-full border border-[#DCE4EF] bg-white px-4 py-2">Resources</a>
        <a href="/admin/faqs" className="rounded-full border border-[#DCE4EF] bg-white px-4 py-2">FAQs</a>
        <a href="/admin/pricing" className="rounded-full border border-[#DCE4EF] bg-white px-4 py-2">Pricing</a>
        <a href="/admin/features" className="rounded-full border border-[#DCE4EF] bg-white px-4 py-2">Features</a>
      </nav>

      <div className="mt-6 rounded-3xl border border-[#DCE4EF] bg-[#F5F8FC] p-6">
        <h2 className="text-[18px] font-extrabold">Quick manage</h2>
        <p className="mt-1 text-[14px] text-[#52627A]">Use the editor below. Pages, SEO, images and ordering are all editable without code.</p>
        <div className="mt-4"><AdminClient initialKind="subjects" /></div>
      </div>
    </div>
  );
}
