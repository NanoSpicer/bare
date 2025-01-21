import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "file:./sqlite.db", 
  },
  breakpoints: false
 });