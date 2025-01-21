import { logger } from "@logging";
import { apiTokens } from "../src/database/schema";
import { db } from "../src/db";

await db
  .insert(apiTokens)
  .values({
    name: '__admin__',
    token: crypto.randomUUID()
  })
  .onConflictDoNothing()

logger.info('Created admin token')

process.exit(0)