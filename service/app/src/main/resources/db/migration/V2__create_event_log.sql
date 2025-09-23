-- V2__create_event_log.sql
-- Event log / outbox for auditing mutations.
CREATE TABLE IF NOT EXISTS event_log (
    id          BIGSERIAL PRIMARY KEY,
    entity      TEXT NOT NULL,
    entity_id   BIGINT,
    event_type  TEXT NOT NULL,
    payload     JSONB,
    created_at  TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_event_log_entity ON event_log(entity);
CREATE INDEX IF NOT EXISTS idx_event_log_created_at ON event_log(created_at);
