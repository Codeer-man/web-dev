CREATE TYPE "public"."roles" AS ENUM('admin', 'users');--> statement-breakpoint
CREATE TABLE "Users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"user_id" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "UsersT" CASCADE;--> statement-breakpoint
ALTER TABLE "auth" RENAME COLUMN "lastname" TO "last_name";--> statement-breakpoint
ALTER TABLE "auth" ADD COLUMN "role" "roles" DEFAULT 'users';--> statement-breakpoint
ALTER TABLE "auth" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "auth" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_user_id_auth_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth"("id") ON DELETE no action ON UPDATE no action;