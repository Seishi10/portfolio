import GearSection from "@/components/GearSection";
import { supabase } from "@/lib/supabaseClient";
import { fallbackGear } from "@/lib/portfolioDefaults";
import type { GearItem } from "@/lib/types";

export default async function GearPage() {
  const { data } = await supabase.from("gear_items").select("*").order("sort_order", { ascending: true }).returns<GearItem[]>();
  return <main className="min-h-screen"><GearSection items={data?.length ? data : fallbackGear} /></main>;
}
