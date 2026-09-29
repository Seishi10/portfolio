"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type CaseFile = {
  id: string;
  case_number: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  writeup: string | null;
  drive_url: string | null;
};

export default function AdminCaseFilesPanel({
  initialCaseFiles,
}: {
  initialCaseFiles: CaseFile[];
}) {
  const router = useRouter();
  const [caseNumber, setCaseNumber] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("");
  const [writeup, setWriteup] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const [error, setError] = useState("");

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!caseNumber.trim() || !title.trim() || !category.trim() || !summary.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const { error: insertError } = await supabase.from("case_files").insert({
      case_number: caseNumber,
      title,
      category: category.toUpperCase(),
      summary,
      tags: tagsArray,
      writeup: writeup.trim() ? writeup : null,
      drive_url: driveUrl.trim() ? driveUrl : null,
    });

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setCaseNumber("");
    setTitle("");
    setCategory("");
    setSummary("");
    setTags("");
    setWriteup("");
    setDriveUrl("");
    router.refresh();
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this case file?");
    if (!confirmed) return;

    await supabase.from("case_files").delete().eq("id", id);
    router.refresh();
  }

  return (
    <div className="mt-16 grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold">Add Case File</h2>
        <form onSubmit={handleAdd} className="mt-4 flex flex-col gap-4">
          <input
            placeholder="Case Number (e.g. CASE-005)"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <input
            placeholder="Category (e.g. DETECTION, IR, FORENSICS, RECON)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <textarea
            placeholder="Summary"
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <input
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <textarea
            placeholder="Incident Analysis writeup (optional)"
            rows={4}
            value={writeup}
            onChange={(e) => setWriteup(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <input
            placeholder="Google Drive URL (optional)"
            value={driveUrl}
            onChange={(e) => setDriveUrl(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <button
            type="submit"
            className="w-fit rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Add Case File
          </button>
          {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold">
          Existing Case Files ({initialCaseFiles.length})
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {initialCaseFiles.map((cf) => (
            <div
              key={cf.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"
            >
              <div>
                <p className="font-medium text-sm">
                  {cf.case_number} — {cf.title}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {cf.category}
                </p>
              </div>
              <button
                onClick={() => handleDelete(cf.id)}
                className="text-xs font-medium text-[var(--color-error)] hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}