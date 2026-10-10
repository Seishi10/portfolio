"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseBrowser";
import type { SiteSettings } from "@/lib/types";

export default function AdminGithubPanel({ initialSettings }: { initialSettings: SiteSettings }) {
  const router = useRouter();
  const [username, setUsername] = useState(initialSettings.github_username);
  const [url, setUrl] = useState(initialSettings.github_url);
  const [note, setNote] = useState(initialSettings.github_note ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setError("");
    const { error: saveError } = await supabase.from("site_settings").upsert({ id: "main", github_username: username.trim(), github_url: url.trim(), github_note: note.trim() || null });
    if (saveError) { setError(saveError.message); return; }
    setMessage("GitHub settings saved."); router.refresh();
  }

  return <section className="mt-16"><h2 className="text-lg font-semibold">GitHub activity memory</h2><p className="mt-2 text-sm text-[var(--color-text-secondary)]">Manage the profile identity shown beside the styled activity visual.</p><form onSubmit={save} className="mt-4 grid max-w-xl gap-3"><input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]" /><input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Profile URL" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]" /><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note" rows={3} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]" /><button type="submit" className="glass-action glass-action-primary w-fit px-4 py-2 text-sm">Save GitHub settings</button>{message ? <p className="text-sm text-[var(--color-success)]">{message}</p> : null}{error ? <p className="text-sm text-[var(--color-error)]">{error}</p> : null}</form></section>;
}
