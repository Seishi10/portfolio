import GithubMemory from "@/components/GithubMemory";
import { supabase } from "@/lib/supabaseClient";
import { fallbackSettings } from "@/lib/portfolioDefaults";
import type { SiteSettings } from "@/lib/types";

export default async function GithubPage() {
  const { data } = await supabase.from("site_settings").select("*").eq("id", "main").returns<SiteSettings[]>();
  return <main className="min-h-screen"><GithubMemory settings={data?.[0] ?? fallbackSettings} /></main>;
}
