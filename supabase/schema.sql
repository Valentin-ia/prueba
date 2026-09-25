-- Run this once in Supabase -> SQL Editor.
-- It creates the public avatar bucket and the minimum profile table used by the client.

insert into storage.buckets (id, name, public)
values ('loop-avatars', 'loop-avatars', true)
on conflict (id) do update set public = excluded.public;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_path text,
  bio text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- Public read access for avatars.
create policy "Avatar images are publicly readable"
  on storage.objects for select
  to public
  using (bucket_id = 'loop-avatars');

-- Each user can upload only inside a folder named with their user id.
create policy "Users can upload their own avatar"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'loop-avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update their own avatar"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'loop-avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'loop-avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own avatar"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'loop-avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Optional: automatically create a profile after email confirmation.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
