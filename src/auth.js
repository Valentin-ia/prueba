import { isSupabaseConfigured, requireSupabase } from './supabase.js';

const emailRedirectTo = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_REDIRECT_URL) || undefined;

export async function getSession() {
  if (!isSupabaseConfigured) return null;
  const client = requireSupabase();
  const { data, error } = await client.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getCurrentUser() {
  const client = requireSupabase();
  const { data, error } = await client.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function signIn({ email, password }) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp({ email, password, displayName, avatar }) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName || email.split('@')[0] },
      ...(emailRedirectTo ? { emailRedirectTo } : {})
    }
  });
  if (error) throw error;
  if (data.user && avatar) {
    const { uploadUserAvatar } = await import('./storage.js');
    await uploadUserAvatar(avatar, data.user.id);
  }
  return data;
}

export async function signOut() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export function onAuthStateChange(callback) {
  const client = requireSupabase();
  const { data } = client.auth.onAuthStateChange((event, session) => callback(event, session));
  return data.subscription;
}
