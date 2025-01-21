import { and, eq, not } from "drizzle-orm"
import { apiTokens } from "../database/schema"
import { db } from "../db"
import { logger } from "@logging"


const log = logger.child({
  module: 'data/api-tokens'
})

export async function createToken(tokenName: string) {
  log.info("Creating API Token with name "+tokenName)

  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(crypto.randomUUID());
  const token = hasher.digest("hex");

  const [row] = await db.insert(apiTokens).values({
    name: tokenName,
    token
  }).returning()

  return row
}

export async function deleteToken(uuid: string) {

  log.info("Deleting API Token with name "+uuid)
  const [row] = await db.delete(apiTokens).where(
    eq(apiTokens.id, uuid)
  ).returning()

  return row
}

export async function getToken(token: string) {
  const [row] = await db
    .select({ name: apiTokens.name })
    .from(apiTokens)
    .where(
      eq(apiTokens.token, token)
    )

  return row
}

export async function getTokens() {
  return await db.select().from(apiTokens).where(
    not(eq(apiTokens.name, '__admin__'))
  )
}