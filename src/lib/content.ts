// Fallback seed content — used when DB is empty/unavailable.
// Real CMS content (Prisma) always takes precedence.

export const DEFAULT_FEATURES = [
  { title: "Structured Lessons", description: "Focused, bite-sized lessons that build understanding step by step — no more jumping between scattered resources.", icon: "book", order: 0, enabled: true },
  { title: "Practice Questions", description: "Test understanding with exam-style questions and clear explanations that reinforce key concepts.", icon: "check", order: 1, enabled: true },
  { title: "Smart Revision", description: "Review important concepts at the right time and strengthen long-term memory.", icon: "refresh", order: 2, enabled: true },
  { title: "Study Plans", description: "Know exactly what to study next. Your daily plan removes decision fatigue.", icon: "calendar", order: 3, enabled: true },
  { title: "Exam Countdown", description: "Keep your examination timeline visible and actionable, with work scheduled backwards from the date.", icon: "clock", order: 4, enabled: true },
  { title: "Progress Tracking", description: "See completed work, streaks and coverage at a glance. Stay motivated with visible momentum.", icon: "chart", order: 5, enabled: true },
];

export const DEFAULT_SUBJECTS = [
  { name: "Anatomy", slug: "anatomy", description: "Structure of the human body — regions, systems and clinical correlates.", icon: "body", color: "#1557C0", order: 0, featured: true },
  { name: "Physiology", slug: "physiology", description: "How the body works — from cells to integrated organ systems.", icon: "pulse", color: "#0F766E", order: 1, featured: true },
  { name: "Biochemistry", slug: "biochemistry", description: "Molecules, metabolism and the chemistry behind health and disease.", icon: "flask", color: "#7C3AED", order: 2, featured: true },
  { name: "Pathology", slug: "pathology", description: "Mechanisms of disease — causes, processes and morphological changes.", icon: "micro", color: "#D99A21", order: 3, featured: false },
  { name: "Pharmacology", slug: "pharmacology", description: "Drugs, mechanisms, uses and adverse effects — organised for recall.", icon: "pill", color: "#159A78", order: 4, featured: false },
  { name: "Microbiology", slug: "microbiology", description: "Bacteria, viruses, fungi and parasites — high-yield and exam-focused.", icon: "bug", color: "#1769E0", order: 5, featured: false },
];

export const DEFAULT_FAQS = [
  { question: "What is Doctology?", answer: "Doctology is a medical education platform that brings lessons, practice questions, revision and exam preparation into one calm, structured learning experience.", category: "General", order: 0, published: true },
  { question: "Who is Doctology for?", answer: "Doctology is designed for medical and health-science students who want structured study, consistent revision and focused exam preparation.", category: "General", order: 1, published: true },
  { question: "What subjects are available?", answer: "Core subjects include Anatomy, Physiology, Biochemistry, Pathology, Pharmacology and Microbiology. Availability grows over time — check the Subjects page for the current list.", category: "Content", order: 2, published: true },
  { question: "Can I use Doctology on my phone?", answer: "Yes. Doctology is fully responsive and works on iPhone, Android, tablets, laptops and desktops. Your study plan travels with you.", category: "Access", order: 3, published: true },
  { question: "Does Doctology help with exam preparation?", answer: "Yes. Exam countdowns, scheduled plans, practice questions and revision workflows are built around keeping you exam-ready without last-minute panic.", category: "Exams", order: 4, published: true },
  { question: "Can I study at my own pace?", answer: "Absolutely. Follow the suggested plan when you want structure, or pick individual lessons and questions whenever you prefer self-directed study.", category: "Study", order: 5, published: true },
  { question: "How does revision work?", answer: "Revision surfaces previously studied concepts for review so you retain what you learned. Mark topics for review and track what still needs attention.", category: "Study", order: 6, published: true },
  { question: "Is Doctology free?", answer: "Pricing is configurable and may change during early access. See the Pricing page for the current plans. Core educational access is kept as affordable as possible.", category: "Pricing", order: 7, published: true },
  { question: "How do I get started?", answer: "Create an account on the student app, choose your subjects, and follow your study plan. Start with one 30-minute session today.", category: "Getting started", order: 8, published: true },
];

export const DEFAULT_RESOURCES = [
  {
    title: "How to Build a Better Medical Study Routine",
    slug: "better-medical-study-routine",
    excerpt: "A calm, sustainable routine beats marathon cramming. Here's a simple framework medical students can actually stick to.",
    content: "## Why routines matter\n\nMedical content is vast. A repeatable routine reduces decision fatigue and makes daily progress visible.\n\n## A simple framework\n\n1. **Plan** — pick one topic per session.\n2. **Learn** — study in focused 25–45 minute blocks.\n3. **Practice** — answer 5–10 questions immediately after.\n4. **Revise** — review yesterday's topic briefly.\n\n## Tips\n\n- Keep sessions short and consistent.\n- Track completion, not hours.\n- Protect sleep — memory consolidates overnight.\n\n> Doctology is an educational platform and is not a substitute for professional medical advice.",
    author: "Doctology Team", category: "Study Guide", readingTime: 6, status: "published",
  },
  {
    title: "How Active Recall Helps Medical Students",
    slug: "active-recall-medical-students",
    excerpt: "Testing yourself is one of the most effective ways to retain complex medical knowledge.",
    content: "## What is active recall?\n\nActive recall means retrieving information from memory rather than re-reading.\n\n## How to use it\n\n- Close the notes and write what you remember.\n- Use practice questions after every lesson.\n- Explain concepts aloud in your own words.\n\n## Why it works\n\nRetrieval strengthens memory traces and reveals gaps early — exactly what practice questions are for.",
    author: "Doctology Team", category: "Learning Tips", readingTime: 5, status: "published",
  },
  {
    title: "How to Prepare for Anatomy Exams",
    slug: "prepare-anatomy-exams",
    excerpt: "Anatomy rewards structure: regions, relations and clinical meaning — not isolated memorisation.",
    content: "## Study by region and system\n\nGroup structures by region, blood supply, innervation and function.\n\n## Use relations\n\nAsk: what is anterior, posterior, medial, lateral? What passes through?\n\n## Add clinical anchors\n\nLink each area to one clinical correlate to make it memorable.\n\n## Revise with diagrams\n\nRedraw simple schematics from memory weekly.",
    author: "Doctology Team", category: "Exam Prep", readingTime: 7, status: "published",
  },
  {
    title: "Building a Sustainable Revision System",
    slug: "sustainable-revision-system",
    excerpt: "Forgetting is normal. A lightweight revision loop keeps knowledge fresh without burnout.",
    content: "## The loop\n\nLearn → Practice → Review → Revise → Improve.\n\n## Weekly cadence\n\n- **Daily:** 10-minute review of yesterday.\n- **Weekly:** revisit the week's topics.\n- **Monthly:** mixed practice across subjects.\n\nSmall, regular revision beats occasional marathons.",
    author: "Doctology Team", category: "Revision", readingTime: 4, status: "published",
  },
];

export const DEFAULT_PLANS = [
  { name: "Starter", price: "Free", interval: "", description: "Explore Doctology and build a learning habit.", features: JSON.stringify(["Access to selected lessons", "Daily study plan", "Practice questions (limited)", "Progress tracking"]), cta: "Get Started", highlighted: false, badge: null, ordering: 0, enabled: true },
  { name: "Plus", price: "Coming soon", interval: "", description: "Full library, revision and exam tools.", features: JSON.stringify(["All subjects & lessons", "Full question bank", "Smart revision", "Exam countdown & plans", "Priority support"]), cta: "Join Waitlist", highlighted: true, badge: "Most popular", ordering: 1, enabled: true },
  { name: "Institution", price: "Talk to us", interval: "", description: "For colleges, cohorts and study groups.", features: JSON.stringify(["Cohort plans", "Educator dashboard", "Custom content", "Onboarding support"]), cta: "Contact Us", highlighted: false, badge: null, ordering: 2, enabled: true },
];

export function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Minimal safe markdown renderer (headings, bold, italic, lists, links, quotes, code)
export function renderMarkdown(md: string): string {
  const esc = escapeHtml(md);
  const lines = esc.split("\n");
  let html = "";
  let inList: string | null = null;
  for (const line of lines) {
    if (/^###\s+/.test(line)) { if (inList) { html += `</${inList}>`; inList = null; } html += `<h3>${line.replace(/^###\s+/, "")}</h3>`; }
    else if (/^##\s+/.test(line)) { if (inList) { html += `</${inList}>`; inList = null; } html += `<h2>${line.replace(/^##\s+/, "")}</h2>`; }
    else if (/^#\s+/.test(line)) { if (inList) { html += `</${inList}>`; inList = null; } html += `<h2>${line.replace(/^#\s+/, "")}</h2>`; }
    else if (/^&gt;\s?/.test(line)) { if (inList) { html += `</${inList}>`; inList = null; } html += `<blockquote>${line.replace(/^&gt;\s?/, "")}</blockquote>`; }
    else if (/^(\-|\*|\d+\.)\s+/.test(line)) {
      const tag = /^\d+\.\s+/.test(line) ? "ol" : "ul";
      if (inList !== tag) { if (inList) html += `</${inList}>`; html += `<${tag}>`; inList = tag; }
      html += `<li>${line.replace(/^(\-|\*|\d+\.)\s+/, "")}</li>`;
    } else if (line.trim() === "") { if (inList) { html += `</${inList}>`; inList = null; } }
    else { if (inList) { html += `</${inList}>`; inList = null; } html += `<p>${line}</p>`; }
  }
  if (inList) html += `</${inList}>`;
  return html
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
}
