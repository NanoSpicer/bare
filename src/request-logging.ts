import { logger } from "@logging";
import Elysia from "elysia";
import chalk from "chalk"
import type { Server } from "elysia/universal";

const isDev = process.env.NODE_ENV === 'dev'
const ident = (msg: string) => msg

const verbColors: Record<string, (msg: string) => string> = {
  GET: isDev ? chalk.bgBlue : ident,
  POST: isDev ? chalk.bgGreen : ident,
  PUT: isDev ? chalk.bgYellow : ident,
  DELETE: isDev ? chalk.bgRed : ident,
  PATCH: isDev ? chalk.bgMagenta : ident,
  OPTIONS: isDev ? chalk.bgCyan : ident,
  HEAD: isDev ? chalk.bgGray : ident,
}

function logRequest({ ip, request, requestStart, response }: {
  ip: string | undefined,
  requestStart: number | undefined,
  request: Request,
  response: unknown
}) {
  const requestEnd = Date.now()
  const timeDiff = requestEnd - (requestStart ?? Number.NaN)
  const colored = (
    isDev 
      // @ts-expect-error
      ? response.status >= 400 ? chalk.bgRed : chalk.bgGreen
      : ident
  )

  const message = [
    verbColors[request.method](`${request.method} ${request.url}`),
    // @ts-expect-error
    colored(response.status),
    `in ${timeDiff}ms`
  ]
  logger.info(message.join(' '), {
    ip,
    url: request.url,
    method: request.method,
    durationMS: timeDiff,
    // @ts-expect-error
    response: response.status
  })
}

function init({ server, request }: {
  server: Server | null,
  request: Request
}) {
  const requestStart = Date.now()
  const ip = [
    request.headers.get('X-Real-IP'),
    request.headers.get('X-Forwarded-For'),
    server?.requestIP(request)?.address
  ].find(Boolean) ?? 'unknown-ip'
  return { ip, requestStart }
}

export const requestLogging = new Elysia()
  .derive({ as: 'global' }, ({server, request}) => init({server, request}))
  .onRequest(ctx=>  {
    const addons = init(ctx)
    // @ts-expect-error
    ctx.ip = addons.ip
    // @ts-expect-error
    ctx.requestStart = addons.requestStart
  })
  .onAfterResponse({ as: 'global' }, ({ request, response, ip, requestStart, set }) => {
    logRequest({ 
      request, 
      requestStart,
      ip,
      response: {
        // @ts-expect-error
        status: response?.status ?? set.status
      }
    })
  })
  .onError({ as: 'global' }, ({ code, ip, request, requestStart }) => {
    logRequest({
      ip,
      request,
      requestStart,
      response: {
        status: (() => {
          switch (code) {
            case 'NOT_FOUND': return 404
            case 'VALIDATION': return 422
            case 'PARSE': return 422
            case 'INVALID_COOKIE_SIGNATURE': return 401
            case 'INTERNAL_SERVER_ERROR':
            default: return 500
          }
        })()
      }
    })
  })
  .as('global')