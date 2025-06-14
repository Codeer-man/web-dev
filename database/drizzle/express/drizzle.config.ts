
import {defineConfig} from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    out: "./drizzle",
    schema: "./src/lib/schema",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})