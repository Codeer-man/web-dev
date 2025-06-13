CREATE TABLE "User" (
	"_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Video" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Video_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"video_url" varchar(256) NOT NULL,
	"thumnail_url" varchar(256) NOT NULL,
	"controls" boolean DEFAULT true,
	"transformation" jsonb DEFAULT '{"height":{"config":{"name":"","keyAsName":true,"notNull":false,"default":1080,"hasDefault":true,"primaryKey":false,"isUnique":false,"dataType":"number","columnType":"PgInteger"},"foreignKeyConfigs":[]},"width":{"config":{"name":"","keyAsName":true,"notNull":false,"default":1920,"hasDefault":true,"primaryKey":false,"isUnique":false,"dataType":"number","columnType":"PgInteger"},"foreignKeyConfigs":[]}}'::jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
