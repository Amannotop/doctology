import { SITE } from "@/lib/seo";

export async function GET() {
  const base = SITE.url.replace(/\/$/, "");
  const body = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/admin\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
