CREATE TABLE "UsersT" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "UsersT_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	CONSTRAINT "UsersT_email_unique" UNIQUE("email")
);
