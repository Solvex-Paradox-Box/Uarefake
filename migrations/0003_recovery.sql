-- Recovery evidence schema compatible with the existing enterprise tables.
-- Existing deployments already have these tables; fresh PGLite databases create them here.
create table if not exists checkpoints (
  id text primary key,
  tenant_id text not null,
  checkpoint_id text not null,
  target_mutation text not null,
  classification text not null,
  snapshot_state_json text not null,
  created_at bigint not null,
  updated_at bigint,
  status text,
  version text,
  payload_json jsonb
);

-- Upgrade databases where checkpoints predates this migration. CREATE TABLE IF
-- NOT EXISTS does not add columns to an existing table, which caused deploys to
-- fail when the following index referenced target_id. This is additive and safe
-- for existing rows; new recovery-drill rows always supply target_id explicitly.
alter table checkpoints
  add column if not exists target_id text;

create table if not exists failures (
  id text primary key,
  tenant_id text,
  execution_run_id text,
  failure_type text not null,
  severity text not null,
  message text not null,
  quarantined boolean not null default true,
  resolved_at bigint,
  created_at bigint not null,
  updated_at bigint,
  status text,
  version text,
  payload_json jsonb
);

create table if not exists rollback_records (
  id text primary key,
  tenant_id text not null,
  checkpoint_id text not null,
  reason text not null,
  status text not null,
  restored_hash text,
  created_at bigint not null,
  updated_at bigint,
  version text,
  payload_json jsonb
);

create index if not exists checkpoints_target_idx on checkpoints (target_mutation, created_at);
create index if not exists failures_target_idx on failures (failure_type, created_at);
create index if not exists rollbacks_target_idx on rollback_records (checkpoint_id, created_at);
