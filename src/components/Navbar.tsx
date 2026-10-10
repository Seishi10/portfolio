"use client";

import Link from "next/link";
import { useState } from "react";

type IconName = "home" | "about" | "skills" | "work" | "case" | "contact";
const navLinks: { href: string; label: string; icon: IconName }[] = [
  { href: "/#home", label: "Overview", icon: "home" },
  { href: "/#about", label: "About", icon: "about" },
  { href: "/#skills", label: "Skills", icon: "skills" },
  { href: "/#work", label: "Projects", icon: "work" },
  { href: "/#case-files", label: "Case Files", icon: "case" },
  { href: "/#contact", label: "Contact", icon: "contact" },
];

function NavIcon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.45 };
  const paths: Record<IconName, React.ReactNode> = {
    home: <path {...common} d="m2.5 7.2 5.5-4.5 5.5 4.5v6.3H9.8v-3.3H6.2v3.3H2.5z" />,
    about: <><circle {...common} cx="8" cy="4.8" r="2" /><path {...common} d="M3.8 14c.35-2.3 1.75-3.5 4.2-3.5s3.85 1.2 4.2 3.5" /></>,
    skills: <><path {...common} d="M3 3.5h10v9H3z" /><path {...common} d="M5 6h6M5 8.5h3M5 11h5" /></>,
    work: <><path {...common} d="M2.5 5h4l1.2 1.5h5.8v7h-11z" /><path {...common} d="M2.5 7h11" /></>,
    case: <><path {...common} d="M4 2.8h6l2 2v8.4H4z" /><path {...common} d="M10 2.8v2h2M6 8h4M6 10.5h3" /></>,
    contact: <><rect {...common} x="2.2" y="3.5" width="11.6" height="8.8" rx="1.3" /><path {...common} d="m3.2 5 4.8 3.7L12.8 5" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0">{paths[name]}</svg>;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <header className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] lg:inset-y-0 lg:right-auto lg:w-64 lg:border-b-0 lg:border-r">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:block lg:px-6 lg:py-7">
        <Link href="/#home" onClick={closeMenu} className="group block"><span className="block font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">Portfolio / 2026</span><span className="mt-1 block text-lg font-semibold tracking-tight group-hover:text-[var(--color-accent)]">Jonathan Jude Suico</span></Link>
        <button type="button" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] lg:hidden"><span aria-hidden="true" className="flex flex-col gap-1.5"><span className={`h-px w-5 bg-current transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} /><span className={`h-px w-5 bg-current transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} /><span className={`h-px w-5 bg-current transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} /></span></button>
        <div className={`${isMenuOpen ? "mt-5 grid" : "hidden"} lg:mt-16 lg:grid`}><p className="mb-3 font-mono text-[0.63rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">Navigate</p><ul className="grid gap-1">{navLinks.map((link) => <li key={link.href}><Link href={link.href} onClick={closeMenu} className="group flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"><NavIcon name={link.icon} /><span>{link.label}</span><span className="ml-auto text-xs text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100">↗</span></Link></li>)}</ul></div>
        <div className="hidden lg:mt-20 lg:block"><div className="border-t border-[var(--color-border)] pt-5"><p className="font-mono text-[0.63rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Currently open to</p><p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">Entry-level software roles<br />Cebu / remote</p><a href="mailto:jonathanjude.suico@gmail.com" className="mt-4 block text-xs text-[var(--color-text-primary)] hover:text-[var(--color-accent)]">↳ Say hello</a></div><p className="mt-8 font-mono text-[0.62rem] text-[var(--color-text-muted)]">© {new Date().getFullYear()} / JJS</p></div>
      </nav>
    </header>
  );
}
