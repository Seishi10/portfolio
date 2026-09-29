"use client";

import { useState } from "react";
import type { CaseFile } from "@/app/case-files/page";
import { getSafeHttpsUrl } from "@/lib/safeUrl";

const categoryColors: Record<string, string> = {
  DETECTION: "border-red-500/40 text-red-400",
  IR: "border-amber-500/40 text-amber-400",
  FORENSICS: "border-sky-500/40 text-sky-400",
  RECON: "border-emerald-500/40 text-emerald-400",
};

export default function CaseFilesGrid({
  caseFiles,
}: {
  caseFiles: CaseFile[];
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="mt-10 grid items-start gap-6 sm:grid-cols-2">
      {caseFiles.map((caseFile) => {
        const badgeStyle =
          categoryColors[caseFile.category] ?? "border-gray-500/40 text-gray-400";
        const isExpanded = expandedId === caseFile.id;
        const safeDriveUrl = getSafeHttpsUrl(caseFile.drive_url);

        return (
          <div
            key={caseFile.id}
            className="interactive-card rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-4 shadow-sm backdrop-blur-sm sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                {caseFile.case_number}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide ${badgeStyle}`}
              >
                {caseFile.category}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-[var(--color-text-primary)]">
              {caseFile.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{caseFile.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {caseFile.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--color-border)] px-2 py-1 font-mono text-[11px] text-[var(--color-text-primary)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {caseFile.writeup && (
              <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : caseFile.id)}
                  className="block font-mono text-xs text-[var(--color-accent)] transition-transform duration-200 hover:translate-x-1 hover:underline"
                >
                  {isExpanded ? "− Hide Incident Analysis" : "+ View Incident Analysis"}
                </button>
                {isExpanded && (
                  <p className="analysis-content mt-3 whitespace-pre-line text-sm text-[var(--color-text-secondary)]">
                    {caseFile.writeup}
                  </p>
                )}
                {safeDriveUrl && (
  
   <a href={safeDriveUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 block w-fit font-mono text-xs text-[var(--color-accent)] hover:underline"
  >
    View Full Documentation ↗
  </a>
)}
              </div>
              
            )}
          </div>
        );
      })}
    </div>
  );
}
