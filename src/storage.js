import { requireSupabase, storageBucket } from './supabase.js';

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function makeId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getExtension(file) {
  const fromName = file.name?.split('.').pop()?.toLowerCase();
  const fromType = file.type?.split('/')[1]?.replace('jpeg', 'jpg');
  return fromName || fromType || 'bin';
}

export async function uploadImage(file, { folder = 'avatars', userId } = {}) {
  if (!file) throw new Error('Seleccioná una imagen.');
  if (!allowedTypes.has(file.type)) throw new Error('Usá una imagen JPG, PNG, WEBP o GIF.');

  const client = requireSupabase();
  let ownerId = userId;
  if (!ownerId) {
    const { data, error } = await client.auth.getUser();
    if (error) throw error;
    ownerId = data.user?.id;
  }
  if (!ownerId) throw new Error('Iniciá sesión antes de subir una imagen.');

  const path = `${ownerId}/${makeId()}.${getExtension(file)}`;
  const { error } = await client.storage.from(storageBucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type
  });
  if (error) throw error;

  const { data } = client.storage.from(storageBucket).getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

export async function uploadUserAvatar(file, userId) {
  const uploaded = await uploadImage(file, { folder: 'avatars', userId });
  const client = requireSupabase();
  const { error } = await client.from('profiles').upsert({
    id: userId,
    avatar_path: uploaded.path
  });
  // The avatar upload is still valid if the optional profiles migration is not installed yet.
  if (error) console.warn('No se pudo actualizar profiles:', error.message);
  return uploaded;
}
