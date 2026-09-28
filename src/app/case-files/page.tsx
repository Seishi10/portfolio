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
  created_at: string;
};

export default async function CaseFilesPage() {
  const { data: caseFiles } = await supabase
    .from("case_files")
    .select("*")
    .order("case_number", { ascending: true })
    .returns<CaseFile[]>();

  return (
    <div className="min-h-screen bg-[#0A0E17] text-[#E5E7EB]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-sm text-[#38BDF8]">/case-files</p>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
          Case Files
        </h1>
        <p className="mt-4 max-w-2xl text-[#9CA3AF]">
          Hands-on security operations work — SIEM detection, incident
          response, packet forensics, and network reconnaissance — completed
          across coursework and lab environments.
        </p>

        <CaseFilesGrid caseFiles={caseFiles ?? []} />
      </div>
    </div>
  );
}