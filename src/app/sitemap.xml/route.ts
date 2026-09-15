import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Sitemap",
};

export async function GET() {
  const now = new Date().toISOString();
  const staticRoutes = ["/", "/features", "/subjects", "/resources", "/how-it-works", "/pricing", "/faq", "/about", "/contact", "/privacy", "/terms", "/cookies"];
  let dynamic: string[] = [];
  try {
    const [subjects, resources] = await Promise.all([
      prisma.subject.findMany({ where: { status: "published" }, select: { slug: true } }),
      prisma.resource.findMany({ where: { status: "published" }, select: { slug: true } }),
    ]);
    dynamic = [...subjects.map((s) => `/subjects/${s.slug}`), ...resources.map((r) => `/resources/${r.slug}`)];
  } catch {}

  const urls = [...staticRoutes, ...dynamic]
    .map((p) => `  <url><loc>${absoluteUrl(p)}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
