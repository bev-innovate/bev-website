-- Realign `enquiries` with the enquiry form carried over from the Wix site.
--
-- The form now asks for first and last name separately, replaces the fixed "topic" with
-- the ecosystem-interest list, renames the free-text field to goals, and offers a
-- newsletter opt-in. Additive throughout: existing rows keep their values, and `name`
-- is still written (first and last joined) so anything already reading it keeps working.

alter table public.enquiries
  add column if not exists first_name text,
  add column if not exists last_name  text,
  add column if not exists interest   text,
  add column if not exists subscribe  boolean not null default false;

-- `topic` was constrained to four fixed values. The interest list replaced it and is
-- open-ended, so the constraint goes and the column becomes optional. It is left in
-- place rather than dropped, to preserve whatever is already stored in it.
alter table public.enquiries drop constraint if exists enquiries_topic_check;
alter table public.enquiries alter column topic drop not null;

-- Handy when triaging: who asked to be kept in the loop.
create index if not exists enquiries_subscribe_idx on public.enquiries (subscribe)
  where subscribe;
