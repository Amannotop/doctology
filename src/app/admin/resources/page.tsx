import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminClient from "../AdminClient";
export default async function Page() {
  const s = await getSession();
  if (!s) redirect("/admin/login");
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
      <a href="/admin" className="font-bold text-[#1557C0]">← Dashboard</a>
      <div className="mt-4"><AdminClient initialKind="resources" /></div>
    </div>
  );
}
