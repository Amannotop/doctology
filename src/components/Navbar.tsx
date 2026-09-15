"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./ui";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/subjects", label: "Subjects" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/resources", label: "Resources" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#DCE4EF]/80 bg-white/85 backdrop-blur-xl">
      <a href="#main" className="skip-link">Skip to content</a>
      <nav aria-label="Primary" className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-underline rounded-full px-3.5 py-2.5 text-[14.5px] font-semibold text-[#2A3A55] hover:text-[#07111F]">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-2.5 lg:flex">
          <Link href="/admin/login" className="rounded-full px-4 py-2.5 text-[14.5px] font-semibold text-[#52627A] hover:text-[#07111F]">
            Log in
          </Link>
          <Link href="/contact" className="btn-press inline-flex min-h-[44px] items-center rounded-full bg-[#1557C0] px-5 text-[14.5px] font-bold text-white hover:bg-[#124AA3]">
            Start Learning
          </Link>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-xl border border-[#DCE4EF] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      {/* Mobile drawer */}
      <div id="mobile-menu" className={cn("lg:hidden", open ? "block" : "hidden")}>
        <div className="border-t border-[#DCE4EF] bg-white px-4 pb-6 pt-2" role="dialog" aria-label="Mobile navigation">
          <ul className="divide-y divide-[#EDF2F9]">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-[16px] font-semibold text-[#17233A]">
                  {l.label}
                  <span aria-hidden className="text-[#9AA9C0]">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2.5">
            <Link href="/contact" onClick={() => setOpen(false)} className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#1557C0] font-bold text-white">
              Start Learning
            </Link>
            <Link href="/admin/login" onClick={() => setOpen(false)} className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#DCE4EF] font-bold text-[#07111F]">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
