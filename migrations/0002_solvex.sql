-- SOLVEX compact schema. Timestamps are BIGINT unix-ms (the source SQLite
-- dump used INTEGER; Postgres INTEGER overflows Date.now()).

create table if not exists paradoxes (
  id text primary key,
  code text not null unique,
  name text not null,
  domain text not null,
  category text not null,
  classification text not null,
  scope text not null,
  formal_invariant text not null,
  z3_smt_assertion text not null,
  verification_status text not null,
  created_at bigint not null
);

create table if not exists solutions (
  id text primary key,
  code text not null unique,
  title text not null,
  domain text not null,
  implementation_source text not null,
  implementation_hash text not null,
  verification_status text not null,
  proof_bundle_id text,
  performance_boost_percent real not null default 0,
  reversibility_guaranteed integer not null default 1,
  status text not null,
  created_at bigint not null
);

create table if not exists offers (
  id text primary key,
  solution_id text not null,
  proof_bundle_id text not null,
  title text not null,
  description text not null,
  cost_basis_cents integer not null,
  verification_complexity_factor real not null default 1,
  risk_class text not null,
  price_cents integer not null,
  sla_tier text,
  published integer not null,
  verification_status text not null,
  publication_blocked_reason text,
  created_at bigint not null
);

create table if not exists node_registry (
  id text primary key,
  node_code text not null unique,
  node_name text not null,
  subsystem text not null,
  status text not null,
  capabilities_json text not null,
  created_at bigint not null
);

create table if not exists adapter_status (
  id text primary key,
  adapter_name text not null,
  provider text not null,
  environment text not null,
  status text not null,
  last_error text,
  checked_at bigint not null
);

create table if not exists orders (
  id text primary key,
  offer_id text not null,
  solution_id text not null,
  proof_bundle_id text not null,
  price_cents integer not null,
  status text not null,
  payment_id text,
  deployment_id text,
  created_at bigint not null,
  updated_at bigint not null
);

create table if not exists audit_records (
  id text primary key,
  index_num integer not null,
  actor text not null,
  action text not null,
  target_entity text not null,
  target_id text not null,
  payload_json text not null,
  payload_hash text not null,
  previous_hash text not null,
  record_hash text not null unique,
  created_at bigint not null
);

create table if not exists execution_runs (
  id text primary key,
  run_type text not null,
  target_id text,
  status text not null,
  input_hash text,
  output_hash text,
  evidence_hash text,
  started_at bigint not null,
  completed_at bigint
);

create table if not exists verification_runs (
  id text primary key,
  scope text not null,
  environment text not null,
  commit_sha text,
  status text not null,
  gates_passed integer not null,
  gates_total integer not null,
  root_hash text,
  started_at bigint not null,
  completed_at bigint
);

create index if not exists paradoxes_domain_idx on paradoxes (domain);
create index if not exists offers_published_idx on offers (published);
create index if not exists audit_records_index_idx on audit_records (index_num);
