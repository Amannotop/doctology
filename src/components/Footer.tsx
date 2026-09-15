import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050B16] text-[#B9C6DA]" aria-label="Footer">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-xl font-extrabold text-white">Doctology</p>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed">
              A calm, structured place to learn medicine. Lessons, questions, revision and exam preparation — in one focused experience.
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-[#7E90AB]">
              Doctology is an educational platform and is not a substitute for professional medical advice.
            </p>
          </div>
          <nav aria-label="Product">
            <p className="text-[13px] font-bold uppercase tracking-widest text-white">Product</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {[
                ["/features", "Features"],
                ["/subjects", "Subjects"],
                ["/resources", "Resources"],
                ["/pricing", "Pricing"],
                ["/faq", "FAQ"],
              ].map(([h, l]) => (
                <li key={h}><Link className="hover:text-white" href={h}>{l}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <p className="text-[13px] font-bold uppercase tracking-widest text-white">Company</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li><Link className="hover:text-white" href="/about">About</Link></li>
              <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-white" href="/how-it-works">How it works</Link></li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <p className="text-[13px] font-bold uppercase tracking-widest text-white">Legal</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li><Link className="hover:text-white" href="/privacy">Privacy Policy</Link></li>
              <li><Link className="hover:text-white" href="/terms">Terms of Service</Link></li>
              <li><Link className="hover:text-white" href="/cookies">Cookie Policy</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13.5px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Doctology. All rights reserved.</p>
          <p className="text-[#7E90AB]">Designed for medical students · Learn · Practice · Revise</p>
        </div>
      </div>
    </footer>
  );
}
