-- Better Earth Ventures — form submission tables.
--
-- Sanity owns editorial content. Supabase owns what the public writes: newsletter
-- signups and enquiries. Both tables are locked down with RLS and written to only from
-- the server using the service-role key, which bypasses RLS.

create extension if not exists "pgcrypto";

create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text,
  created_at  timestamptz not null default now(),
  constraint newsletter_subscribers_email_key unique (email)
);

create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  organisation  text,
  topic         text not null check (topic in ('programme', 'partnership', 'media', 'other')),
  message       text not null,
  handled       boolean not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_handled_idx on public.enquiries (handled) where not handled;

-- Deny-by-default: RLS on with no policies means anon and authenticated roles get
-- nothing. The service-role key used by the server actions bypasses RLS entirely.
alter table public.newsletter_subscribers enable row level security;
alter table public.enquiries enable row level security;
