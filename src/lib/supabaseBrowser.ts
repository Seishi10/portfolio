import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// This client stores the Supabase session in cookies so Proxy and Server
// Components can see the same authenticated session after login.
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
