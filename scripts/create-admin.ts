import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@doctology.site";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const name = process.env.ADMIN_NAME ?? "Doctology Admin";
  const hash = await bcrypt.hash(password, 10);
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    await prisma.admin.update({ where: { email }, data: { passwordHash: hash, name } });
    console.log(`Updated admin password for ${email}`);
  } else {
    await prisma.admin.create({ data: { email, passwordHash: hash, name, role: "superadmin" } });
    console.log(`Created admin ${email}`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => prisma.$disconnect());
