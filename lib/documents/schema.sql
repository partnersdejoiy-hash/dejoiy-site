CREATE TABLE IF NOT EXISTS document_requests (
 id uuid PRIMARY KEY, email text NOT NULL, type text NOT NULL,
 details jsonb NOT NULL, status text NOT NULL DEFAULT 'received'
 CHECK(status IN ('received','under_review','needs_information','completed')),
 owner text, version integer NOT NULL DEFAULT 1,
 client_key uuid NOT NULL, payload_hash text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 expires_at timestamptz NOT NULL DEFAULT now() + interval '90 days',
 UNIQUE(email, client_key)
);
CREATE INDEX IF NOT EXISTS document_requests_email_idx ON document_requests(email, created_at DESC);
CREATE TABLE IF NOT EXISTS document_files (
 id uuid PRIMARY KEY, request_id uuid NOT NULL REFERENCES document_requests(id) ON DELETE CASCADE,
 filename text NOT NULL, content bytea NOT NULL, kind text NOT NULL CHECK(kind IN ('supporting','released')),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS document_events (
 id bigserial PRIMARY KEY, request_id uuid NOT NULL REFERENCES document_requests(id) ON DELETE CASCADE,
 actor text NOT NULL, action text NOT NULL, message text NOT NULL DEFAULT '',
 public boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS document_tokens (
 hash text PRIMARY KEY, email text NOT NULL, role text NOT NULL CHECK(role IN ('requester','staff')),
 expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS document_sessions (
 hash text PRIMARY KEY, email text NOT NULL, role text NOT NULL CHECK(role IN ('requester','staff')),
 expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS document_limits (
 key text PRIMARY KEY, hits integer NOT NULL, expires_at timestamptz NOT NULL
);
