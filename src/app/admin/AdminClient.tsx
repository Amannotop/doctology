"use client";
import { useEffect, useState } from "react";

type Kind = "subjects" | "features" | "resources" | "faqs" | "pricing";

const KIND_META: Record<Kind, { label: string; fields: { key: string; label: string; type: string; note?: string }[] }> = {
  subjects: {
    label: "Subjects",
    fields: [
      { key: "name", label: "Name", type: "text" },
      { key: "slug", label: "Slug (unique)", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "icon", label: "Icon", type: "text", note: "book|pulse|flask|micro|pill|bug|cap|body|search etc." },
      { key: "color", label: "Color hex", type: "text" },
      { key: "order", label: "Order (number)", type: "number" },
      { key: "featured", label: "Featured (true/false)", type: "text" },
      { key: "status", label: "Status (published/draft)", type: "text" },
    ],
  },
  features: {
    label: "Features",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "icon", label: "Icon", type: "text" },
      { key: "order", label: "Order", type: "number" },
      { key: "enabled", label: "Enabled (true/false)", type: "text" },
    ],
  },
  resources: {
    label: "Resources",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "slug", label: "Slug", type: "text" },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "content", label: "Content (markdown)", type: "textarea" },
      { key: "author", label: "Author", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "readingTime", label: "Reading time (min)", type: "number" },
      { key: "status", label: "Status (draft/published/archived)", type: "text" },
      { key: "image", label: "Image URL", type: "text" },
    ],
  },
  faqs: {
    label: "FAQs",
    fields: [
      { key: "question", label: "Question", type: "text" },
      { key: "answer", label: "Answer", type: "textarea" },
      { key: "category", label: "Category", type: "text" },
      { key: "order", label: "Order", type: "number" },
      { key: "published", label: "Published (true/false)", type: "text" },
    ],
  },
  pricing: {
    label: "Pricing Plans",
    fields: [
      { key: "name", label: "Plan name", type: "text" },
      { key: "price", label: "Price (e.g. Free / €49 / Coming soon)", type: "text" },
      { key: "interval", label: "Interval (e.g. /month)", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "features", label: 'Features (JSON array, e.g. ["A","B"])', type: "textarea" },
      { key: "cta", label: "CTA label", type: "text" },
      { key: "badge", label: "Badge (optional)", type: "text" },
      { key: "ordering", label: "Order", type: "number" },
      { key: "highlighted", label: "Highlighted (true/false)", type: "text" },
      { key: "enabled", label: "Enabled (true/false)", type: "text" },
    ],
  },
};

function coerceValue(v: string, field: { type: string }) {
  if (field.type === "number") return Number(v);
  if (v === "true") return true;
  if (v === "false") return false;
  return v;
}

export default function AdminClient({ initialKind }: { initialKind: Kind }) {
  const [kind, setKind] = useState<Kind>(initialKind);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function load(k: Kind) {
    setLoading(true);
    setMsg(null);
    const r = await fetch(`/api/admin/content?kind=${k}`);
    const j = await r.json().catch(() => ({}));
    if (r.status === 401) { location.href = "/admin/login"; return; }
    setRows(j.data ?? []);
    setLoading(false);
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(kind); }, [kind]);

  async function onSave(form: FormData) {
    const payload: Record<string, unknown> = {};
    for (const f of KIND_META[kind].fields) {
      const raw = String(form.get(f.key) ?? "").trim();
      if (raw !== "") payload[f.key] = coerceValue(raw, f);
    }
    // Ensure slugs lowercased
    if (payload.slug && typeof payload.slug === "string") payload.slug = (payload.slug as string).toLowerCase().replace(/\s+/g, "-");
    const url = "/api/admin/content";
    const method = isNew ? "POST" : "PUT";
    const body = isNew ? { kind, payload } : { kind, id: (editing as { id: string }).id, payload };
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { setMsg(j.error ?? "Failed."); return; }
    setEditing(null); setIsNew(false); setMsg("Saved.");
    load(kind);
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    const r = await fetch(`/api/admin/content?kind=${kind}&id=${id}`, { method: "DELETE" });
    if (!r.ok) { const j = await r.json().catch(() => ({})); setMsg(j.error ?? "Delete failed."); return; }
    setMsg("Deleted."); load(kind);
  }

  const meta = KIND_META[kind];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(KIND_META) as Kind[]).map((k) => (
          <button key={k} onClick={() => setKind(k)} className={`rounded-full px-4 py-2 text-[14px] font-bold ${k === kind ? "bg-[#07111F] text-white" : "border border-[#DCE4EF] bg-white text-[#07111F]"}`}>{KIND_META[k].label}</button>
        ))}
        <button onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); location.href = "/admin/login"; }} className="ml-auto rounded-full border border-[#DCE4EF] bg-white px-4 py-2 font-bold">Log out</button>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-xl font-extrabold">{meta.label}</h2>
        <button onClick={() => { setEditing({}); setIsNew(true); }} className="rounded-full bg-[#1557C0] px-5 py-2.5 font-bold text-white">+ Add</button>
      </div>

      {msg && <p className="mt-3 rounded-xl bg-amber-50 px-4 py-2 text-[14px] font-semibold text-amber-800">{msg}</p>}
      {loading ? <p className="mt-6 text-[#52627A]">Loading…</p> : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#DCE4EF] bg-white">
          <table className="w-full min-w-[720px] text-left text-[14px]">
            <thead className="bg-[#F5F8FC] text-[12px] uppercase tracking-widest text-[#52627A]">
              <tr>{Object.keys(rows[0] ?? { id: "", title: "" }).slice(0, 5).map((k) => <th key={k} className="px-4 py-3">{k}</th>)}<th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-[#EDF2F9]">
              {rows.length === 0 && <tr><td className="px-4 py-6 text-[#52627A]" colSpan={6}>No items yet. Click Add.</td></tr>}
              {rows.map((r) => (
                <tr key={String(r.id)}>
                  {Object.entries(r).slice(0, 5).map(([k, v]) => <td key={k} className="max-w-[260px] truncate px-4 py-3">{String(v ?? "")}</td>)}
                  <td className="flex gap-2 px-4 py-3">
                    <button onClick={() => { setEditing(r); setIsNew(false); }} className="rounded-full border border-[#DCE4EF] px-3 py-1.5 font-bold">Edit</button>
                    <button onClick={() => onDelete(String(r.id))} className="rounded-full bg-red-50 px-3 py-1.5 font-bold text-[#B42318]">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <form
            onSubmit={(e) => { e.preventDefault(); onSave(new FormData(e.currentTarget)); }}
            className="max-h-[90vh] w-full max-w-[640px] overflow-auto rounded-3xl bg-white p-6"
          >
            <h3 className="text-lg font-extrabold">{isNew ? "Add" : "Edit"} {meta.label}</h3>
            <div className="mt-4 grid gap-3">
              {meta.fields.map((f) => (
                <label key={f.key} className="grid gap-1">
                  <span className="text-[13px] font-bold">{f.label} {f.note && <span className="font-normal text-[#52627A]">— {f.note}</span>}</span>
                  {f.type === "textarea" ? (
                    <textarea name={f.key} defaultValue={String((editing as Record<string, unknown>)[f.key] ?? "")} rows={3} className="rounded-xl border border-[#DCE4EF] px-3 py-2.5 text-[14px]" />
                  ) : (
                    <input name={f.key} defaultValue={String((editing as Record<string, unknown>)[f.key] ?? "")} className="min-h-[44px] rounded-xl border border-[#DCE4EF] px-3 text-[14px]" />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => { setEditing(null); setIsNew(false); }} className="rounded-full border border-[#DCE4EF] px-5 py-2.5 font-bold">Cancel</button>
              <button className="rounded-full bg-[#1557C0] px-6 py-2.5 font-bold text-white">Save</button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-[#DCE4EF] bg-white p-5">
        <h3 className="font-extrabold">Media upload</h3>
        <p className="mt-1 text-[14px] text-[#52627A]">Images up to 4MB (jpg, png, webp, avif, svg). Safe filenames, stored in <code className="rounded bg-black/5 px-1">/public/uploads</code>.</p>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget as HTMLFormElement);
          const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
          const j = await r.json().catch(() => ({}));
          if (!r.ok) { alert(j.error ?? "Upload failed"); return; }
          alert(`Uploaded: ${j.url}`);
        }} className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input type="file" name="file" accept="image/*" required className="flex-1 rounded-xl border border-[#DCE4EF] px-3 py-2.5 text-[14px]" />
          <input name="alt" placeholder="Alt text" className="flex-1 rounded-xl border border-[#DCE4EF] px-3 py-2.5 text-[14px]" />
          <button className="rounded-full bg-[#07111F] px-6 py-3 font-bold text-white">Upload</button>
        </form>
      </div>
    </div>
  );
}
