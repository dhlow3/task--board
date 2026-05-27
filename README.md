# Task Board

A minimal task management app built with React, Vite, and Supabase.

## Features

- Add, complete, and delete tasks
- Data persisted in Supabase (Postgres)
- Realtime updates via Supabase Realtime

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

## Setup

### 1. Create the database table

In the Supabase SQL Editor, run:

```sql
create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  is_complete boolean not null default false,
  created_at timestamptz default now()
);
```

Then enable Row Level Security and add a policy:

```sql
alter table tasks enable row level security;

create policy "Allow all for anon" on tasks
  for all
  using (true)
  with check (true);
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase project URL and anon key from **Settings → API** in the Supabase dashboard.

### 3. Install dependencies and start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
