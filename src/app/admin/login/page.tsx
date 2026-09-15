import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  const s = await getSession();
  if (s) redirect("/admin");
  return (
    <div className="mx-auto max-w-[480px] px-4 py-14 sm:px-6">
      <div className="rounded-3xl border border-[#DCE4EF] bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold text-[#07111F]">Admin login</h1>
        <p className="mt-2 text-[14px] text-[#52627A]">
          Use the credentials from your <code className="rounded bg-black/5 px-1.5 py-0.5">.env</code> / <code className="rounded bg-black/5 px-1.5 py-0.5">ADMIN_EMAIL</code>. No secrets are hard-coded.
        </p>
        <LoginForm />
        <p className="mt-5 text-center text-[13px] text-[#52627A]">
          Forgot password? Reset via <code className="rounded bg-black/5 px-1.5 py-0.5">scripts/create-admin.ts</code> — see README.
        </p>
      </div>
    </div>
  );
}
