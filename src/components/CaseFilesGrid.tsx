"use client";

import { useState } from "react";
import type { CaseFile } from "@/lib/types";
import { getSafeHttpsUrl } from "@/lib/safeUrl";

const categoryColors: Record<string, string> = {
  DETECTION: "border-red-500/40 text-red-400",
  IR: "border-amber-500/40 text-amber-400",
  FORENSICS: "border-sky-500/40 text-sky-400",
  RECON: "border-emerald-500/40 text-emerald-400",
};

function getLearningContext(caseFile: CaseFile) {
  const searchable = [
    caseFile.title,
    caseFile.summary,
    caseFile.writeup ?? "",
    ...caseFile.tags,
  ].join(" ").toLowerCase();

  if (searchable.includes("bots") || searchable.includes("dns tunneling")) {
    return "Guided lab: Splunk BOTS v2";
  }

  if (searchable.includes("cve-2011-2523") || searchable.includes("metasploitable")) {
    return "Self-directed home lab: isolated Metasploitable 2 VM";
  }

  if (searchable.includes("cisco") || searchable.includes("netacad")) {
    return "Cisco NetAcad lab";
  }

  return "Self-directed security lab";
}

export default function CaseFilesGrid({ caseFiles }: { caseFiles: CaseFile[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="mt-10 grid items-start gap-6 sm:grid-cols-2">
      {caseFiles.map((caseFile) => {
        const badgeStyle = categoryColors[caseFile.category] ?? "border-gray-500/40 text-gray-400";
        const isExpanded = expandedId === caseFile.id;
        const safeDriveUrl = getSafeHttpsUrl(caseFile.drive_url);
        const analysisId = `case-analysis-${caseFile.id}`;
        const writeup = caseFile.writeup?.trim() ?? "";

        return (
          <div
            key={caseFile.id}
            className="interactive-card rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-4 shadow-sm backdrop-blur-sm sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--color-text-secondary)]">{caseFile.case_number}</span>
              <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide ${badgeStyle}`}>
                {caseFile.category}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-[var(--color-text-primary)]">{caseFile.title}</h2>
            <p className="mt-2 w-fit rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 px-2.5 py-1 text-[11px] text-[var(--color-accent)]">
              {getLearningContext(caseFile)}
            </p>
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

            <div className="mt-5 border-t border-[var(--color-border)] pt-4">
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={analysisId}
                onClick={() => setExpandedId(isExpanded ? null : caseFile.id)}
                className="block font-mono text-xs text-[var(--color-accent)] transition-transform duration-200 hover:translate-x-1 hover:underline"
              >
                {isExpanded ? "− Hide Lab Analysis" : "+ View Lab Analysis"}
              </button>

              {isExpanded && (
                <div id={analysisId} className="analysis-content mt-3 rounded-lg border border-[var(--color-border)] bg-black/20 p-4">
                  <p className="whitespace-pre-line text-sm leading-6 text-[var(--color-text-secondary)]">
                    {writeup || "No lab analysis has been added for this case file yet."}
                  </p>
                </div>
              )}

              {safeDriveUrl && (
                <a
                  href={safeDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-fit font-mono text-xs text-[var(--color-accent)] hover:underline"
                >
                  View Supporting Write-up →
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
