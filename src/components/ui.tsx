import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Doctology home">
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-xl bg-[#07111F] text-white"
      >
        {/* owl-ish / medical mark - simple stethoscope + book glyph */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5c0 4 3 7 8 7s8-3 8-7" />
          <circle cx="8.5" cy="8" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="8" r="1.4" fill="currentColor" stroke="none" />
          <path d="M12 12v3a4 4 0 0 0 4 4h1" />
          <circle cx="18.5" cy="19" r="1.6" />
        </svg>
      </span>
      <span className={cn("text-[19px] font-800 font-extrabold tracking-tight", dark ? "text-white" : "text-[#07111F]")}>
        Doctology
      </span>
    </Link>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
}) {
  const styles = {
    primary: "bg-[#1557C0] text-white hover:bg-[#124AA3] shadow-[0_10px_24px_-10px_rgba(21,87,192,0.7)]",
    secondary: "bg-white text-[#07111F] border border-[#DCE4EF] hover:border-[#1557C0] hover:text-[#1557C0]",
    ghost: "text-[#1557C0] hover:bg-[#EAF1FC]",
    dark: "bg-[#07111F] text-white hover:bg-[#0d1c33]",
  }[variant];
  const cls = cn(
    "btn-press inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 text-[15.5px] font-semibold transition",
    styles,
    className
  );
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls}>{children}</button>;
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  dark = false,
  level = "h2",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  dark?: boolean;
  level?: "h1" | "h2";
}) {
  const Tag = level;
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#DCE4EF] bg-white px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#0F766E]">
          {eyebrow}
        </p>
      )}
      <Tag className={cn("text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-[2.75rem]", dark ? "text-white" : "text-[#07111F]")}>
        {title}
      </Tag>
      {sub && (
        <p className={cn("mt-4 text-pretty text-[17px] leading-relaxed", dark ? "text-[#B9C6DA]" : "text-[#52627A]")}>
          {sub}
        </p>
      )}
    </div>
  );
}

export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" /><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" /></>,
    check: <><path d="M20 6 9 17l-5-5" /></>,
    refresh: <><path d="M21 12a9 9 0 1 1-2.6-6.4" /><path d="M21 3v6h-6" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    chart: <><path d="M3 3v18h18" /><path d="M7 15v3M12 10v8M17 6v12" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
    bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    cap: <><path d="m22 10-10-5L2 10l10 5 10-5Z" /><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" /></>,
    body: <><circle cx="12" cy="5" r="2.2" /><path d="M12 8v6m0 0-3 7m3-7 3 7M5 10l7-1 7 1" /></>,
    pulse: <><path d="M3 12h4l3 8 4-16 3 8h4" /></>,
    flask: <><path d="M9 3h6M10 3v6L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3" /></>,
    micro: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" /></>,
    pill: <><path d="m10.5 20.5-7-7a4.95 4.95 0 1 1 7-7l7 7a4.95 4.95 0 1 1-7 7Z" /><path d="m8.5 8.5 7 7" /></>,
    bug: <><rect x="8" y="6" width="8" height="14" rx="4" /><path d="M9 6a3 3 0 0 1 6 0M4 10h4m8 0h4M4 15h4m8 0h4" /></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    play: <><path d="M7 4.5v15l13-7.5-13-7.5Z" fill="currentColor" stroke="none" /></>,
    video: <><rect x="2" y="6" width="13" height="12" rx="2.5" /><path d="m15 10 6-3.5v11L15 14" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name] ?? paths.book}
    </svg>
  );
}
