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
	"time4" time(6) with time zone
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
