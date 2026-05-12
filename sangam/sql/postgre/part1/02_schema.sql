-- db -> schema -> table -> row

CREATE SCHEMA IF NOT EXISTS basics;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- information_schema.schemata is built in view that should your db structure
SELECT schema_name
FROM information_schema.schemata
ORDER BY schema_name;