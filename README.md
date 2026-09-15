# DOCTOLOGY — Public Website + CMS

Premium medical-education website for **Doctology**: lessons, questions, revision and exam preparation in one calm, structured experience.

Built from the supplied student-app screenshots (dark navy `#07111F`, medical blue `#1557C0`, teal `#14B8A6`, rounded cards, editorial typography) — the public site belongs to the same product family without copying the dashboard.

## Features

- **Public site**: Home (hero, trust strip, problem/solution, features, Plan→Improve workflow, dashboard/lesson/focus previews, subjects, resources, pricing teaser, FAQ, final CTA), Features, Subjects + detail, Resources + article pages with search/filter, How It Works, Pricing, FAQ (JSON-LD), About, Contact (validated form), Privacy/Terms/Cookies placeholders, 404.
- **CMS** (`/admin`): dashboard with counts, CRUD for Subjects, Features, Resources, FAQs, Pricing, media uploads (`/public/uploads`, 4MB, image-only, safe filenames, SVG script rejection), draft/published/archived workflow.
- **Auth**: bcrypt-hashed passwords, `jose` JWT in HttpOnly/Secure/SameSite cookie, 12h expiry, rate-limited login, no hard-coded credentials.
- **DB**: Prisma ORM + SQLite (`prisma/dev.db`). Schema is Postgres-compatible — change `provider` to `postgresql` and `DATABASE_URL`.
- **SEO**: unique titles/descriptions, canonical via `metadataBase`, Open Graph + Twitter, JSON-LD (Organization, Article, FAQPage), `/sitemap.xml` (published only), `/robots.txt` (blocks `/admin`), semantic HTML, alt text.
- **A11y**: skip link, focus-visible rings, aria labels, keyboard-accessible menu/accordion, 44px+ targets, `prefers-reduced-motion`.
- **Performance**: minimal deps (next, react, prisma, bcryptjs, jose), Google Fonts with preconnect, no heavy icon/animation libs, static prerendering where possible.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Prisma 6 · SQLite · bcryptjs · jose

## Quick start

```bash
npm install
cp .env.example .env   # set AUTH_SECRET (32+ chars), ADMIN_EMAIL, ADMIN_PASSWORD
npx prisma db push
npx tsx prisma/seed.ts # creates admin + demo subjects/resources/FAQs/plans
npm run dev            # http://localhost:3000
```

Admin: `http://localhost:3000/admin/login` (uses `ADMIN_EMAIL`/`ADMIN_PASSWORD` from `.env`, created by seed).

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | `prisma generate && next build` |
| `npm run start` | production server |
| `npm run lint` / `typecheck` | eslint / tsc |
| `npm run db:push` / `db:seed` / `db:studio` | DB sync / seed / GUI |
| `npm run create-admin` | create/update admin from env (`tsx scripts/create-admin.ts`) |

## Environment

See `.env.example`:

```
DATABASE_URL="file:./dev.db"
AUTH_SECRET="long-random-32-chars-min"
ADMIN_EMAIL="admin@doctology.site"
ADMIN_PASSWORD="ChangeMe123!"
ADMIN_NAME="Doctology Admin"
PUBLIC_SITE_URL="http://localhost:3000"
```

Never commit `.env`. For Postgres: `DATABASE_URL="postgresql://user:pass@host:5432/doctology"` + change `datasource db { provider = "postgresql" }` then `npx prisma migrate dev`.

## Project structure

```
src/app/            # routes: /(public pages), /admin, /api/...
src/components/     # Navbar, Footer, ui (Logo/Button/SectionHeading/Icon), ProductPreview, interactive (FAQ/ContactForm)
src/lib/            # db, auth, content (seed fallbacks + safe markdown), seo, utils
prisma/             # schema.prisma, seed.ts, dev.db
scripts/            # create-admin.ts
public/uploads/     # CMS uploads (gitignored except .gitkeep)
image demo/         # supplied reference screenshots (not used at runtime)
```

## CMS usage

1. Log in at `/admin/login`.
2. Use tabs: Subjects, Features, Resources, FAQs, Pricing.
3. Add → fill fields → Save. Slugs auto-lowercased; `order`/`ordering` controls sorting; `status` (`draft`/`published`/`archived`) controls visibility — public site shows `published` only.
4. Resources support Markdown (headings, bold/italic, lists, links, quotes, code) rendered through a sanitizer (`escapeHtml` + whitelist renderer — never raw HTML).
5. Media upload section: image → alt text → Upload → paste returned `/uploads/…` URL into content image fields.

Roles: schema has `Admin.role` (`superadmin`/`editor`) ready; current UI enforces login for all admin APIs (extend per-action checks for editor restrictions).

## API

- `POST /api/v1/contact` — `{name, email, subject?, message}` with server-side validation; stores `ContactMessage`. Returns `{ok:true}` or `{error}` (never leaks internals).
- `POST /api/admin/login` — rate-limited (8/min/IP), bcrypt compare, sets session cookie.
- `POST /api/admin/logout` — clears cookie.
- `GET/POST/PUT/DELETE /api/admin/content?kind=subjects|features|resources|faqs|pricing` — auth-required CRUD.
- `POST /api/admin/upload` — auth-required image upload.

## Testing performed

- `npm run build` ✅ (39 routes, 0 errors)
- `npm run lint` ✅ 0 errors · `tsc --noEmit` ✅
- Production `next start` + curl: `/`, `/features`, `/subjects`, `/subjects/anatomy`, `/resources`, `/pricing`, `/faq`, `/about`, `/contact`, `/how-it-works`, `/sitemap.xml`, `/robots.txt`, `/admin/login` → all **200**; `POST /api/v1/contact` → `{"ok":true}`; `POST /api/admin/login` (seed creds) → `{"ok":true}`; unauthenticated `/api/admin/content` → 401 ✅
- Manual checks: mobile drawer (Escape closes, focus states), FAQ accordion keyboard, contact validation/error/success states.

## Deployment

1. `npm install`
2. Set env (see above) + `PUBLIC_SITE_URL=https://yourdomain`
3. `npx prisma db push` (or `migrate deploy` on Postgres)
4. `npx tsx prisma/seed.ts` (first time) or `npm run create-admin`
5. `npm run build && npm run start` (behind HTTPS; set `Secure` cookies automatically in production)
6. Backups: dump `prisma/dev.db` (SQLite) or use Postgres PITR; uploads in `public/uploads` need filesystem/object-store backup.

Security headers set in `next.config.ts`: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, full `Content-Security-Policy` (self-first, `frame-ancestors 'none'`); `X-Powered-By` removed; `Secure` cookies only when `PUBLIC_SITE_URL` is `https` (+ HSTS via hosting).

Red-team verified: stored-XSS payloads are entity-escaped at write time (verified in DB) and React-escaped at render; SVG-with-script, executable and >4MB uploads rejected; SQLi returns generic 401 (Prisma parameterized queries); login rate-limited (8/min/IP → 429); tampered/empty JWTs redirect to login; `/.env`, `/package.json`, `/prisma/dev.db` all 404; wrong-method API calls 405.

SEO: canonical URL on every page, `og:image` (`/og-image.png` 1200×630) + Twitter large cards globally and per article/subject, exactly one `<h1>` per page, JSON-LD (Organization/Article/FAQPage). Benchmarks (localhost, warm): `/` ~2ms/124KB, `/subjects` ~2ms/34KB, `/resources` ~6ms/30KB, `/faq` ~1ms/34KB.

## Known limitations / next steps

- `ADMIN_PASSWORD` in `.env` is plaintext at rest (hashed in DB via bcrypt on seed) — rotate via `create-admin` and restrict `.env` access; consider secret manager in production.
- No editor-vs-superadmin UI gating yet (role column exists).
- No content versioning beyond `createdAt/updatedAt/publishedAt` + no preview-before-publish split view (drafts hidden publicly).
- Analytics: add `ANALYTICS_ID` to site settings + consent banner before enabling tracking.
- Lighthouse: not run in this environment (no Chrome); targets are Performance 90+, A11y/SEO/Best-Practices 95+ — images use `next/image`-ready paths, fonts limited to 2 families, JS minimal.

## Medical disclaimer

Doctology is an educational platform and is not a substitute for professional medical advice, diagnosis or treatment. No fake stats, endorsements or accreditations are claimed anywhere.
