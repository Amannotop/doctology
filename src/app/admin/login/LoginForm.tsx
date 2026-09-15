"use client";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) location.href = "/admin";
      else setErr(j.error ?? "Invalid credentials.");
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[13px] font-bold">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="min-h-[48px] w-full rounded-xl border border-[#DCE4EF] px-4" placeholder="admin@doctology.site" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-[13px] font-bold">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="min-h-[48px] w-full rounded-xl border border-[#DCE4EF] px-4" placeholder="••••••••" />
      </div>
      {err && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-[#B42318]">{err}</p>}
      <button disabled={loading} className="min-h-[48px] rounded-full bg-[#1557C0] font-bold text-white hover:bg-[#124AA3] disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
