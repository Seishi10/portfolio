"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";

type IconName = "home" | "about" | "skills" | "experience" | "projects" | "case-files" | "resume" | "contact";

const navLinks: { href: string; label: string; icon: IconName }[] = [
  { href: "/#home", label: "Home", icon: "home" },
  { href: "/#about", label: "About", icon: "about" },
  { href: "/#skills", label: "Skills", icon: "skills" },
  { href: "/#experience", label: "Experience", icon: "experience" },
  { href: "/#projects", label: "Projects", icon: "projects" },
  { href: "/#case-files", label: "Case Files", icon: "case-files" },
  { href: "/#resume", label: "Resume", icon: "resume" },
  { href: "/#contact", label: "Contact", icon: "contact" },
];

function NavIcon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  const paths: Record<IconName, React.ReactNode> = {
    home: <path {...common} d="m3 10 5-4 5 4v6H9v-3H7v3H3z" />,
    about: <><circle {...common} cx="8" cy="5" r="2" /><path {...common} d="M4 14c.3-2.3 1.6-3.5 4-3.5s3.7 1.2 4 3.5" /></>,
    skills: <><rect {...common} x="2.5" y="5" width="11" height="8" rx="1.5" /><path {...common} d="M5.5 5V3.5h5V5M5.5 9h5" /></>,
    experience: <><path {...common} d="M3 13V8m3 5V5m3 8V7m3 6V3" /><path {...common} d="M2 13.5h12" /></>,
    projects: <><path {...common} d="M2.5 4.5h4l1.4 1.7h4.6v7.3h-10z" /><path {...common} d="M2.5 6.2h10" /></>,
    "case-files": <><path {...common} d="M3 3h7l3 3v7H3z" /><path {...common} d="M10 3v3h3M5.5 8h5M5.5 10.5h3" /></>,
    resume: <><path {...common} d="M4 2.5h6l2 2V13H4z" /><path {...common} d="M10 2.5V5h2M6 7h4M6 9.5h4" /></>,
    contact: <><rect {...common} x="2" y="3.5" width="12" height="9" rx="1.5" /><path {...common} d="m3 5 5 4 5-4" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5">{paths[name]}</svg>;
}

export default function Navbar() {
  const dragStartRef = useRef<string | null>(null);
  const suppressClickRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dragTarget, setDragTarget] = useState<string | null>(null);
  const [isNavPressed, setIsNavPressed] = useState(false);

  useEffect(() => {
    const finishDrag = (event: PointerEvent) => {
      const start = dragStartRef.current;
      const hit = document.elementFromPoint(event.clientX, event.clientY);
      const target = hit?.closest<HTMLAnchorElement>("a[data-nav-href]");
      const destination = target?.dataset.navHref;

      if (start && destination && destination !== start) {
        suppressClickRef.current = true;
        window.location.assign(destination);
      }

      dragStartRef.current = null;
      setIsNavPressed(false);
      setDragTarget(null);
    };

    const cancelDrag = () => {
      dragStartRef.current = null;
      setIsNavPressed(false);
      setDragTarget(null);
    };

    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", cancelDrag);
    return () => {
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", cancelDrag);
    };
  }, []);

  const startDrag = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[data-nav-href]");
    const href = anchor?.dataset.navHref;
    if (!href) return;
    dragStartRef.current = href;
    setIsNavPressed(true);
    setDragTarget(href);
  };

  const previewDrag = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (!dragStartRef.current) return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[data-nav-href]");
    const href = anchor?.dataset.navHref;
    if (href) setDragTarget(href);
  };

  const suppressDraggedClick = (event: ReactMouseEvent<HTMLUListElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-[var(--color-border)] lg:fixed lg:right-5 lg:top-1/2 lg:-translate-y-1/2 lg:rounded-2xl lg:border">
      <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:p-2">
        <div className="flex items-center justify-between lg:block">
          <Link href="/#home" onClick={() => setIsMenuOpen(false)} className="font-mono text-sm font-semibold transition-colors duration-200 hover:text-[var(--color-accent)] lg:hidden">
            {"<JonathanSuico />"}
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] lg:hidden"
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className={`block h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        <ul
          className={`hidden items-center gap-1 lg:grid ${isNavPressed ? "rounded-2xl bg-white/5 p-1" : ""}`}
          onPointerDown={startDrag}
          onPointerOver={previewDrag}
          onClickCapture={suppressDraggedClick}
          onDragStart={(event) => event.preventDefault()}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-nav-href={link.href}
                aria-label={link.label}
                title={link.label}
                draggable={false}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border border-transparent text-[var(--color-text-secondary)] transition-all duration-200 hover:border-white/15 hover:bg-white/10 hover:text-[var(--color-text-primary)] ${dragTarget === link.href ? "border-white/20 bg-white/10 text-[var(--color-text-primary)]" : ""}`}
              >
                <NavIcon name={link.icon} />
              </Link>
            </li>
          ))}
        </ul>

        <div id="mobile-navigation" className={`lg:hidden ${isMenuOpen ? "mt-3 grid" : "hidden"}`}>
          <div className="glass-nav-links mobile-nav-panel grid gap-2 p-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="mobile-nav-link flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-white/5 hover:text-[var(--color-accent)]"
              >
                <NavIcon name={link.icon} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
