-- Run this once in the Supabase SQL editor to enable the GitHub and Gear admin panels.

create table if not exists public.gear_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text not null,
  specs text,
  product_url text,
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gear_items enable row level security;
create policy "gear is publicly readable" on public.gear_items for select using (true);
create policy "authenticated users manage gear" on public.gear_items for all to authenticated using (true) with check (true);

create table if not exists public.site_settings (
  id text primary key,
  github_username text not null default 'Seishi10',
  github_url text not null default 'https://github.com/Seishi10',
  github_note text
);

alter table public.site_settings enable row level security;
create policy "site settings are publicly readable" on public.site_settings for select using (true);
create policy "authenticated users manage site settings" on public.site_settings for all to authenticated using (true) with check (true);

insert into public.site_settings (id, github_username, github_url)
values ('main', 'Seishi10', 'https://github.com/Seishi10')
on conflict (id) do nothing;

insert into public.gear_items (name, category, specs, description, sort_order)
values
  ('Acer Nitro ANV15-51-53DG', 'Laptop', 'Specs coming soon', 'Primary machine for development, coursework, security labs, and everyday work.', 1),
  ('Software tools', 'Software', 'Git · GitHub · Visual Studio · Arduino IDE', 'The development tools I use to build, version, test, and work with embedded projects.', 2),
  ('Security tools', 'Software', 'Splunk · Wireshark · Nmap', 'Tools for packet inspection, security analysis, and learning how systems behave under pressure.', 3);
