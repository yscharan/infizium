import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url || !key) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = createClient<any>(url, key, {
  auth: { persistSession: false },
});
