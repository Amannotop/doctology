export const SITE = {
  name: "Doctology",
  tagline: "Study smarter. Build stronger medical knowledge.",
  description:
    "Doctology brings lessons, questions, revision and exam preparation into one focused learning experience for medical and health-science students.",
  url: process.env.PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export function absoluteUrl(path = "/") {
  const base = SITE.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
