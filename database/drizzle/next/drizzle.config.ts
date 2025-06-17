

import {defineConfig} from "drizzle-kit"

export default defineConfig({
    out: "./drizzle",
    dialect: "postgresql",
    schema: "./src/lib/db/schema",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})