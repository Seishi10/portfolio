import { supabase } from "@/lib/supabaseClient";
import AdminProjectsPanel from "@/components/AdminProjectsPanel";
import LogoutButton from "@/components/LogoutButton";
import AdminMessagesPanel from "@/components/AdminMessagesPanel";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type Project = {
  id: string;
  title: string;
  type: string;
  description: string;
  tech: string[];
  created_at: string;
};

const { data: messages } = await supabase
  .from("messages")
  .select("*")
  .order("created_at", { ascending: false })
  .returns<Message[]>();


export default async function AdminDashboard() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Project[]>();

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
</div>
    </section>
  );
}