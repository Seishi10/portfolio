import Link from "next/link";
import { getSafeHttpsUrl } from "@/lib/safeUrl";
import type { SiteSettings } from "@/lib/types";

const levels = ["memory-empty", "memory-low", "memory-mid", "memory-high", "memory-max"];

async function getContributionCells(username: string) {
  try {
    const response = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, { next: { revalidate: 3600 } });
    if (!response.ok) return null;
    const html = await response.text();
    const matches = Array.from(html.matchAll(/data-date="[^"]+"[\s\S]{0,260}?data-level="([0-4])"/g));
    if (!matches.length) return null;
    return matches.map((match, index) => <span key={index} className={`activity-cell ${levels[Number(match[1])]}`} aria-hidden="true" />);
  } catch {
    return null;
  }
}

export default async function GithubMemory({ settings }: { settings: SiteSettings }) {
  const liveCells = await getContributionCells(settings.github_username);
  const cells = liveCells ?? Array.from({ length: 364 }, (_, index) => <span key={index} className="activity-cell memory-empty" aria-hidden="true" />);
  const profileUrl = getSafeHttpsUrl(settings.github_url) ?? "https://github.com/Seishi10";

  return (
    <section id="github" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--color-text-muted)]">07 — github</p>
        <Link href={profileUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]">@{settings.github_username} ↗</Link>
      </div>
      <div className="activity-memory mt-5" aria-label="A visual memory of recent GitHub activity">{cells}</div>
      {settings.github_note ? <p className="mt-3 max-w-xl text-sm text-[var(--color-text-secondary)]">{settings.github_note}</p> : null}
    </section>
  );
}
