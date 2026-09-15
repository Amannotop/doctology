import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-[640px] place-items-center px-4 py-20 text-center sm:px-6">
      <p className="text-[14px] font-bold uppercase tracking-widest text-[#0F766E]">404</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#07111F]">Looks like this page wandered off.</h1>
      <p className="mt-3 text-[17px] text-[#52627A]">The page you’re looking for doesn’t exist or was moved.</p>
      <Link href="/" className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#1557C0] px-6 font-bold text-white">Back to Doctology</Link>
    </div>
  );
}
