"use client";

import Link from "next/link";

type IconName = "home" | "about" | "skills" | "work" | "case" | "github" | "gear" | "contact";
const navLinks: { href: string; label: string; icon: IconName }[] = [
  { href: "/#home", label: "Overview", icon: "home" },
  { href: "/#about", label: "About", icon: "about" },
  { href: "/#skills", label: "Skills", icon: "skills" },
  { href: "/#work", label: "Projects", icon: "work" },
  { href: "/case-files", label: "Case Files", icon: "case" },
  { href: "/github", label: "GitHub", icon: "github" },
  { href: "/gear", label: "Gear", icon: "gear" },
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
    github: <><path {...common} d="M8 2.5a5.5 5.5 0 0 0-1.75 10.72c.28.05.38-.12.38-.27v-.95c-1.55.34-1.88-.66-1.88-.66-.25-.64-.62-.81-.62-.81-.51-.35.04-.34.04-.34.56.04.85.58.85.58.5.85 1.3.61 1.61.47.05-.37.2-.61.36-.75-1.24-.14-2.54-.62-2.54-2.76 0-.61.22-1.11.58-1.5-.06-.14-.25-.71.06-1.48 0 0 .47-.15 1.52.57a5.3 5.3 0 0 1 2.77 0c1.05-.72 1.52-.57 1.52-.57.31.77.12 1.34.06 1.48.36.39.58.89.58 1.5 0 2.15-1.3 2.62-2.55 2.76.2.17.38.5.38 1v1.46c0 .15.1.32.39.27A5.5 5.5 0 0 0 8 2.5Z" /></>,
    gear: <><circle {...common} cx="8" cy="8" r="2.1" /><path {...common} d="m8 2.5.65 1.25 1.4.38 1.2-.48.9.9-.48 1.2.38 1.4L13.3 8l-1.25.65-.38 1.4.48 1.2-.9.9-1.2-.48-1.4.38L8 13.3l-.65-1.25-1.4-.38-1.2.48-.9-.9.48-1.2-.38-1.4L2.7 8l1.25-.65.38-1.4-.48-1.2.9-.9 1.2.48 1.4-.38z" /></>,
    contact: <><rect {...common} x="2.2" y="3.5" width="11.6" height="8.8" rx="1.3" /><path {...common} d="m3.2 5 4.8 3.7L12.8 5" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0">{paths[name]}</svg>;
}

export default function Navbar() {
  const closeMenu = () => undefined;
  return (
    <header className="glass-nav fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] lg:inset-y-0 lg:right-auto lg:w-64 lg:border-r lg:border-t-0">
      <nav className="mx-auto max-w-7xl px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] lg:block lg:px-6 lg:py-7 lg:pb-7">
        <Link href="/#home" onClick={closeMenu} className="group hidden lg:block"><span className="block font-mono text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">Portfolio / 2026</span><span className="mt-1 block text-lg font-semibold tracking-tight group-hover:text-[var(--color-accent)]">Jonathan Jude Suico</span></Link>
        <div className="mt-0 grid lg:mt-16"><p className="mb-3 hidden font-mono text-[0.63rem] uppercase tracking-[0.24em] text-[var(--color-text-muted)] lg:block">Navigate</p><ul className="mobile-bottom-nav grid grid-cols-6 gap-1 lg:grid-cols-1">{navLinks.map((link) => <li key={link.href}><Link href={link.href} onClick={closeMenu} className="group flex min-h-10 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[0.62rem] text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:text-sm"><NavIcon name={link.icon} /><span>{link.label}</span><span className="nav-arrow ml-auto hidden text-xs text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100 lg:inline">↗</span></Link></li>)}</ul></div>
        <div className="hidden lg:mt-20 lg:block"><div className="border-t border-[var(--color-border)] pt-5"><p className="font-mono text-[0.63rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Currently open to</p><p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">Entry-level software roles<br />Cebu / remote</p><a href="mailto:jonathanjude.suico@gmail.com" className="mt-4 block text-xs text-[var(--color-text-primary)] hover:text-[var(--color-accent)]">↳ Say hello</a></div><p className="mt-8 font-mono text-[0.62rem] text-[var(--color-text-muted)]">© {new Date().getFullYear()} / JJS</p></div>
      </nav>
    </header>
  );
}
