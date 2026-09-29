"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      // Wait until the page is hydrated and layout is ready before scrolling.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ block: "start" });
        });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
