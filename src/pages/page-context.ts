import { eq } from "drizzle-orm";
import { apiTokens, files } from "../database/schema";
import { db } from "../db";
import Elysia from "elysia";


async function getAdminToken() {
    const [token] = await db.select().from(apiTokens).where(
      eq(apiTokens.name, '__admin__')
    )

    return token
}

async function getPageContext({ request }: { request: Request }) {
  const [ tokens, fileCount, adminToken ] = await Promise.all([
    db.$count(apiTokens),
    db.$count(files),
    getAdminToken()
  ])
  const url = new URL(request.url)
  return {
    url: url.pathname,
    tokens: Math.max(tokens - 1, 0), // Remove the admin token
    backups: fileCount,
    adminToken
  }
}

export type PageContext = Awaited<ReturnType<typeof getPageContext>>;


export const pageContext = new Elysia()
  .derive(getPageContext)
  .as('plugin')