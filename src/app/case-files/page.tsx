import { supabase } from "@/lib/supabaseClient";
import CaseFilesGrid from "@/components/CaseFilesGrid";
import type { CaseFile } from "@/lib/types";

export default async function CaseFilesPage() {
  const { data: caseFiles } = await supabase
    .from("case_files")
    .select("*")
    .order("case_number", { ascending: true })
    .returns<CaseFile[]>();

  return (
    <div className="min-h-screen bg-transparent text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-sm text-[var(--color-accent)]">/case-files</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Case Files
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
          I work through Splunk and Wireshark labs across SIEM detection,
          incident response, packet forensics, and network reconnaissance —
          including tracing DNS tunneling in the BOTS v2 dataset.
        </p>

        <CaseFilesGrid caseFiles={caseFiles ?? []} />
      </div>
    </div>
  );
}
