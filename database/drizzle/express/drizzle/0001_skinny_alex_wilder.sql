ALTER TABLE "Auth" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "Auth" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;