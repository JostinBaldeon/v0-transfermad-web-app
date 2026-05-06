create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  user text not null,
  email text not null unique,
  password text not null,
  role text not null check (role in ('user', 'admin')),
  coins integer not null default 0,
  "createdAt" timestamptz not null default now()
);

create index if not exists idx_users_email on public.users (email);
