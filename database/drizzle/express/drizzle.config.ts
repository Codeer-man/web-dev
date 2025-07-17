
import {defineConfig} from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    out: "./drizzle",
    schema: "./src/lib/schema",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
    extensionsFilters: ["postgis"],
    introspect: {
        casing: "camel"
    },
    strict:true,
    verbose:true,
    migrations: {
        table: 'manandhar_table',
        schema: "public"
    }
})


// You can provide Drizzle Kit config path via CLI param, it’s very useful when you have multiple database stages or multiple databases or different databases on the same project:

// npx drizzle-kit push --config=drizzle-dev.drizzle.config
// npx drizzle-kit push --config=drizzle-prod.drizzle.config