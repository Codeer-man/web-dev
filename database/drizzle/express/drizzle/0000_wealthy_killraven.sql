CREATE TABLE "Auth" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Auth_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"User_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"invited_by" integer,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Auth_User_name_unique" UNIQUE("User_name")
);
--> statement-breakpoint
CREATE TABLE "Boolean" (
	"boolean" boolean DEFAULT false,
	"float" real,
	"metadata" json,
	"fixObject" json,
	"binaryJson" jsonb,
	"jsonb" jsonb,
	"time1" time,
	"time2" time with time zone,
	"time3" time(6),
	"time4" time(6) with time zone,
	"interval" interval minute
);
--> statement-breakpoint
CREATE TABLE "Post" (
	"id" integer,
	"int1" integer DEFAULT 10,
	"int2" integer DEFAULT '10'::int
);
--> statement-breakpoint
CREATE TABLE "serial" (
	"serial" serial NOT NULL,
	"numeric" numeric,
	"numeric2" numeric(100),
	"numeric3" numeric(100, 20),
	"numericNum" numeric,
	"numericBig" numeric
);
--> statement-breakpoint
CREATE TABLE "Character" (
	"text" text,
	"varchar" varchar(256)
);
