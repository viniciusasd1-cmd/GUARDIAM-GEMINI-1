/**
 * SUPABASE CLIENT CONFIGURATION
 * De acordo com as decisões do GUARDIAM.MD:
 * Supabase é o backend exclusivo (Auth, Banco, Edge Functions).
 */

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseConfig = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  isConfigured: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
};

export default supabaseConfig;
