import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase holds the things Sanity should not: newsletter subscribers and programme
 * application submissions. Sanity is the editorial store; Supabase is the write-path
 * store for data the public submits.
 *
 * Writes happen server-side with the service-role key, so Row Level Security can deny
 * all public access to these tables (see supabase/migrations/0001_init.sql).
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const isSupabaseConfigured = Boolean(url && serviceKey);

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  cached ??= createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
