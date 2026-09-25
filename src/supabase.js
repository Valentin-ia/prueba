import { createClient } from '@supabase/supabase-js';

const viteEnv = (typeof import.meta !== 'undefined' && import.meta.env) || {};
const runtimeConfig = globalThis.SUPABASE_CONFIG || {};
const supabaseUrl = viteEnv.VITE_SUPABASE_URL || runtimeConfig.url || '';
const supabaseAnonKey = viteEnv.VITE_SUPABASE_ANON_KEY || runtimeConfig.anonKey || '';

export const storageBucket = viteEnv.VITE_SUPABASE_STORAGE_BUCKET || runtimeConfig.storageBucket || 'loop-avatars';
export const isSupabaseConfigured = Boolean(
  /^https:\/\/.+\.supabase\.co$/i.test(supabaseUrl) &&
  supabaseAnonKey &&
  !supabaseAnonKey.includes('YOUR_')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

export function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase no está configurado. Copiá .env.example a .env y completá las credenciales.');
  }
  return supabase;
}
