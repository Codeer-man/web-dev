// creating better auth instance
// configure database in it

import { betterAuth } from "better-auth";
import { Pool } from "pg";

// export const auth = betterAuth({
//   database: new Pool({
//     connectionString: process.env.DATABASE_URL,
//   }),
// });

// If you prefer to use an ORM or if your database is not supported by Kysely, you can use one of the built-in adapters.

//* drizzle

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.sdg!,
      clientSecret: process.env.seg!,
    },
  },
});

// Better Auth includes a CLI tool to help manage the schema required by the library.
//* to generate
//! npx @better-auth/cli generate
//* to migrate
//! npx @better-auth/cli migrate not recommeded for me by experience

// To handle API requests, you need to set up a route handler on your server.
//*  route app/api/auth/[...all]/route.ts
