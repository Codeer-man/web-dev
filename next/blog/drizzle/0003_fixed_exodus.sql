ALTER TABLE "session" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "token" DROP NOT NULL;