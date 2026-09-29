import { supabase } from "@/lib/supabaseClient";
import CaseFilesGrid from "@/components/CaseFilesGrid";



export type CaseFile = {
  id: string;
  case_number: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  writeup: string | null;
  drive_url: string | null;
  created_at: string;
};

export default async function CaseFilesPage() {
  const { data: caseFiles } = await supabase
    .from("case_files")
    .select("*")
    .order("case_number", { ascending: true })
    .returns<CaseFile[]>();

  return (
    <div className="min-h-screen bg-transparent text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-sm text-[var(--color-accent)]">/case-files</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Case Files
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
          Hands-on security operations work — SIEM detection, incident
          response, packet forensics, and network reconnaissance — completed
          across coursework and lab environments.
        </p>

        <CaseFilesGrid caseFiles={caseFiles ?? []} />
      </div>
    </div>
  );
}
