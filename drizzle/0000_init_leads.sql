CREATE TABLE IF NOT EXISTS "leads" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "phone" text NOT NULL,
  "telegram" text NOT NULL,
  "quiz_answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "status" text DEFAULT 'new' NOT NULL,
  "source" text DEFAULT 'site' NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "leads_created_at_idx" ON "leads" ("created_at" DESC);
CREATE INDEX IF NOT EXISTS "leads_status_idx" ON "leads" ("status");
