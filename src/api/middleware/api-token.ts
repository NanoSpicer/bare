import { error } from "elysia";
import { getToken } from "../../data/api-tokens";
import { logger } from "@logging";


const keys = {
  header: 'X-Api-Token',
  query: 'api_token'
}

export async function apiTokenMiddleware({ request }: { request: Request }) {
  const token = [
    request.headers.get(keys.header),
    (new URL(request.url)).searchParams.get(keys.query)
  ].find(Boolean)

  if (!token) {
    logger.warn('No token was passed in, searched headers and params. Returning 401')
    return error(401)
  }

  const tokenRow = await getToken(token)

  if (!tokenRow) {
    return error(401)
  }
}