import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import AdminProjectsPanel from "@/components/AdminProjectsPanel";
import LogoutButton from "@/components/LogoutButton";
import AdminMessagesPanel from "@/components/AdminMessagesPanel";
import AdminCaseFilesPanel from "@/components/AdminCaseFilesPanel";


type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type CaseFile = {
  id: string;
  case_number: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  writeup: string | null;
  drive_url: string | null;
};

type Project = {
  id: string;
  title: string;
  type: string;
  description: string;
  tech: string[];
  created_at: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const [{ data: projects }, { data: messages }, { data: caseFiles }] =
    await Promise.all([
      supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .returns<Project[]>(),
      supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .returns<Message[]>(),
      supabase
        .from("case_files")
        .select("*")
        .order("case_number", { ascending: true })
        .returns<CaseFile[]>(),
    ]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <LogoutButton />
      </div>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Manage your portfolio projects below.
      </p>

     <AdminProjectsPanel initialProjects={projects ?? []} />

<div className="mt-16">
  <AdminMessagesPanel messages={messages ?? []} />
  <AdminCaseFilesPanel initialCaseFiles={caseFiles ?? []} />
</div>
    </section>
  );
}
