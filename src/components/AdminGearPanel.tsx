"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseBrowser";
import type { GearItem } from "@/lib/types";

const emptyDraft = { name: "", category: "", specs: "", description: "", product_url: "", image_url: "", sort_order: "0" };

export default function AdminGearPanel({ initialItems }: { initialItems: GearItem[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  function update(field: keyof typeof emptyDraft, value: string) { setDraft((current) => ({ ...current, [field]: value })); }
  function startEdit(item: GearItem) {
    setEditingId(item.id);
    setDraft({ name: item.name, category: item.category, specs: item.specs ?? "", description: item.description, product_url: item.product_url ?? "", image_url: item.image_url ?? "", sort_order: String(item.sort_order) });
  }
  function reset() { setEditingId(null); setDraft(emptyDraft); }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (!draft.name.trim() || !draft.category.trim() || !draft.description.trim()) { setError("Name, category, and description are required."); return; }
    const payload = { name: draft.name.trim(), category: draft.category.trim(), specs: draft.specs.trim() || null, description: draft.description.trim(), product_url: draft.product_url.trim() || null, image_url: draft.image_url.trim() || null, sort_order: Number(draft.sort_order) || 0 };
    const result = editingId ? await supabase.from("gear_items").update(payload).eq("id", editingId) : await supabase.from("gear_items").insert(payload);
    if (result.error) { setError(result.error.message); return; }
    reset(); router.refresh();
  }

  async function remove(id: string) {
    if (!window.confirm("Remove this gear item?")) return;
    const { error: deleteError } = await supabase.from("gear_items").delete().eq("id", id);
    if (deleteError) setError(deleteError.message); else router.refresh();
  }

  return <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]"><div><h2 className="text-lg font-semibold">{editingId ? "Edit gear item" : "Add gear item"}</h2><form onSubmit={handleSubmit} className="mt-4 grid gap-3">{(["name", "category", "specs", "product_url", "image_url", "sort_order"] as const).map((field) => <input key={field} value={draft[field]} onChange={(event) => update(field, event.target.value)} placeholder={field === "product_url" ? "Product URL (optional)" : field === "image_url" ? "Image URL (optional)" : field.replace("_", " ")} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-accent)]" />)}<textarea value={draft.description} onChange={(event) => update("description", event.target.value)} placeholder="Description" rows={4} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-accent)]" /><div className="flex gap-2"><button type="submit" className="glass-action glass-action-primary px-4 py-2 text-sm">{editingId ? "Save changes" : "Add item"}</button>{editingId ? <button type="button" onClick={reset} className="glass-action px-4 py-2 text-sm">Cancel</button> : null}</div>{error ? <p className="text-sm text-[var(--color-error)]">{error}</p> : null}</form></div><div><h2 className="text-lg font-semibold">Gear items ({initialItems.length})</h2><div className="mt-4 grid gap-3">{initialItems.map((item) => <div key={item.id} className="flex items-start justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"><div><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-[var(--color-text-secondary)]">{item.category}{item.specs ? ` · ${item.specs}` : ""}</p></div><div className="flex gap-3 text-xs"><button onClick={() => startEdit(item)} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Edit</button><button onClick={() => remove(item.id)} className="text-[var(--color-error)] hover:underline">Delete</button></div></div>)}</div></div></div>;
}
