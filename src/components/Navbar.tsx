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
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/#home" className="font-mono text-sm font-semibold transition-colors duration-200 hover:text-[var(--color-accent)]">
          {"<JonathanSuico />"}
        </Link>
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
      </nav>
    </header>
  );
}
