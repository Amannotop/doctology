import { prisma } from "../src/lib/db";
import { DEFAULT_FEATURES, DEFAULT_SUBJECTS, DEFAULT_RESOURCES, DEFAULT_FAQS, DEFAULT_PLANS } from "../src/lib/content";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding…");

  // Admin
  const email = process.env.ADMIN_EMAIL ?? "admin@doctology.site";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const name = process.env.ADMIN_NAME ?? "Doctology Admin";
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (!existing) {
    const hash = await bcrypt.hash(password, 10);
    await prisma.admin.create({ data: { email, passwordHash: hash, name, role: "superadmin" } });
    console.log(`Created admin: ${email}`);
  } else {
    console.log(`Admin exists: ${email}`);
  }

  for (const [i, f] of DEFAULT_FEATURES.entries()) {
    const exists = await prisma.feature.findFirst({ where: { title: f.title } });
    if (!exists) await prisma.feature.create({ data: { ...f, order: i } });
  }

  for (const [i, s] of DEFAULT_SUBJECTS.entries()) {
    const exists = await prisma.subject.findUnique({ where: { slug: s.slug } });
    if (!exists) await prisma.subject.create({ data: { ...s, order: i } });
  }

  for (const r of DEFAULT_RESOURCES) {
    const exists = await prisma.resource.findUnique({ where: { slug: r.slug } });
    if (!exists) await prisma.resource.create({ data: { ...r, publishedAt: new Date() } });
  }

  for (const [i, f] of DEFAULT_FAQS.entries()) {
    const exists = await prisma.faq.findFirst({ where: { question: f.question } });
    if (!exists) await prisma.faq.create({ data: { ...f, order: i } });
  }

  for (const [i, p] of DEFAULT_PLANS.entries()) {
    const exists = await prisma.pricingPlan.findFirst({ where: { name: p.name } });
    if (!exists) await prisma.pricingPlan.create({ data: { ...p, ordering: i } });
  }

  // Pages
  const pages = [
    { title: "About", slug: "about", seoTitle: "About Doctology", seoDesc: "Mission and philosophy.", content: "About page content.", status: "published" },
  ];
  for (const pg of pages) {
    const exists = await prisma.page.findUnique({ where: { slug: pg.slug } });
    if (!exists) await prisma.page.create({ data: { ...pg, publishedAt: new Date() } });
  }

  const settings: [string, string][] = [
    ["site_title", "Doctology"],
    ["site_description", "Study smarter. Build stronger medical knowledge."],
    ["contact_email", "support@doctology.site"],
  ];
  for (const [k, v] of settings) {
    const exists = await prisma.siteSetting.findUnique({ where: { key: k } });
    if (!exists) await prisma.siteSetting.create({ data: { key: k, value: v } });
  }

  console.log("Seed done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
