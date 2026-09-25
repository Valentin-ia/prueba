// Static hosting fallback. Do not put a service_role key here.
// Prefer VITE_SUPABASE_* variables for Vite builds.
window.SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT.supabase.co',
  anonKey: 'YOUR_PUBLIC_ANON_KEY',
  storageBucket: 'loop-avatars'
};
