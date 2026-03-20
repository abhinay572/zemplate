import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Main client — used for authenticated operations (auth, user profile, etc.)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Public client — used for unauthenticated reads (templates, public data).
// This avoids the auth lock contention issue where getSession() hangs and
// blocks ALL .from() queries because supabase-js calls _getAccessToken()
// (which calls auth.getSession()) before every REST request.
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
