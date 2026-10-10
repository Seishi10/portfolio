import { getSafeHttpsUrl } from "@/lib/safeUrl";
import type { GearItem } from "@/lib/types";

export default function GearSection({ items }: { items: GearItem[] }) {
  return (
    <section id="gear" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">Setup / tools</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">gear</h2>
      <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">The hardware and software I use to build, learn, and stay productive.</p>
      <div className="mt-10 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const url = getSafeHttpsUrl(item.product_url);
          const isTool = item.category.toLowerCase() === "software";
          const tools = item.specs?.split("·").map((tool) => tool.trim()).filter(Boolean) ?? [];
          return (
            <article key={item.id} className="interactive-card overflow-hidden rounded-2xl border border-[var(--color-border)]">
              {isTool ? <div className="gear-tools-panel flex flex-wrap items-start gap-2 p-5" aria-label={`${item.name} tools`}>{tools.map((tool) => <span key={tool} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-secondary)]">{tool}</span>)}</div> : <div className="gear-placeholder flex h-52 items-center justify-center p-8" aria-label={`${item.name} image`}><img src={item.image_url ?? "/Images/acer-nitro-anv15-51-53dg.jpg"} alt={item.name} className="h-full w-full object-contain" /></div>}
              <div className="border-t border-[var(--color-border)] p-5">
                <div className="flex items-start justify-between gap-4"><h3 className="font-medium">{item.name}</h3>{url ? <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.name} link`} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">↗</a> : null}</div>
                {item.specs ? <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[var(--color-text-secondary)]">{item.specs}</p> : null}
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
