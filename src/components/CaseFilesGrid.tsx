"use client";

import { useState } from "react";
import type { CaseFile } from "@/app/case-files/page";

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
    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      {caseFiles.map((caseFile) => {
        const badgeStyle =
          categoryColors[caseFile.category] ?? "border-gray-500/40 text-gray-400";
        const isExpanded = expandedId === caseFile.id;

        return (
          <div
            key={caseFile.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#6B7280]">
                {caseFile.case_number}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide ${badgeStyle}`}
              >
                {caseFile.category}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-white">
              {caseFile.title}
            </h2>
            <p className="mt-2 text-sm text-[#9CA3AF]">{caseFile.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {caseFile.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-[#D1D5DB]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {caseFile.writeup && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : caseFile.id)}
                  className="font-mono text-xs text-[#38BDF8] hover:underline"
                >
                  {isExpanded ? "− Hide Incident Analysis" : "+ View Incident Analysis"}
                </button>
                {isExpanded && (
                  <p className="mt-3 whitespace-pre-line text-sm text-[#9CA3AF]">
                    {caseFile.writeup}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}