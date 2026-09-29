"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/case-files", label: "Case Files" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const dragStartRef = useRef<string | null>(null);
  const suppressClickRef = useRef(false);
  const [dragTarget, setDragTarget] = useState<string | null>(null);
  const [isNavPressed, setIsNavPressed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const finishDrag = (event: PointerEvent) => {
      const start = dragStartRef.current;
      const hit = document.elementFromPoint(event.clientX, event.clientY);
      const target = hit?.closest<HTMLAnchorElement>("a[data-nav-href]") ?? null;
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
    if (!href) return;
    setDragTarget(href);
  };

  const suppressDraggedClick = (event: ReactMouseEvent<HTMLUListElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-[var(--color-border)]">
      <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between">
        <Link href="/#home" onClick={() => setIsMenuOpen(false)} className="font-mono text-sm font-semibold transition-colors duration-200 hover:text-[var(--color-accent)]">
          {"<JonathanSuico />"}
        </Link>
        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:hidden"
        >
          <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
        <ul
          className={`hidden select-none gap-2 text-sm font-medium sm:flex ${isNavPressed ? "glass-nav-links" : ""}`}
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
                draggable={false}
                className={`relative block rounded-full border border-transparent px-3 py-2 text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)] ${dragTarget === link.href ? "text-[var(--color-accent)]" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        </div>

        <div id="mobile-navigation" className={`sm:hidden ${isMenuOpen ? "mt-3 grid" : "hidden"}`}>
          <div className="glass-nav-links grid gap-1 rounded-2xl p-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-white/5 hover:text-[var(--color-accent)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
