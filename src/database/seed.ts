import { logger } from "@logging"
import { db } from "../db"
import { apiTokens } from "./schema"

export async function initializeDB() {
  await db
    .insert(apiTokens)
    .values({
      name: '__admin__',
      token: crypto.randomUUID()
    })
    .onConflictDoNothing()

  logger.info('Created admin token')
}