import Link from "next/link";
import { getSafeHttpsUrl } from "@/lib/safeUrl";
import type { SiteSettings } from "@/lib/types";

const levels = ["memory-empty", "memory-low", "memory-mid", "memory-high"];

export default function GithubMemory({ settings }: { settings: SiteSettings }) {
  const cells = Array.from({ length: 364 }, (_, index) => {
    const column = index % 52;
    const row = Math.floor(index / 52);
    const signal = (column * 13 + row * 7 + column * row) % 17;
    const level = signal < 5 ? 0 : signal < 9 ? 1 : signal < 14 ? 2 : 3;
    return <span key={index} className={`activity-cell ${levels[level]}`} aria-hidden="true" />;
  });
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
