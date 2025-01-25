import Elysia from "elysia";
import { pages } from './pages';
import { basicAuth } from "./api/middleware/authentication";
import { api } from "./api";
import { logger } from "@logging";
import { requestLogging } from "./request-logging";
import { configuration } from "@configuration";

const {
  AUTH_USERNAME = 'admin',
  AUTH_PASSWORD = 'admin'
} = configuration


// if it ends with a slash remove the last character as a prefix
function ammend(path: string): string {
  return path.endsWith('/') ? path.slice(0, -1) : path
}

const options =
  configuration.APP_ROOT
    ? { prefix: ammend(configuration.APP_ROOT) }
    : undefined

export const server = new Elysia({
  ...options,
  serve: {
    maxRequestBodySize: configuration.MAX_REQUEST_BODY_SIZE_MB
  }
})
  .use(requestLogging)
  .use(api)
  .use(app => app
    .onBeforeHandle({ as: 'local' }, basicAuth({ username: AUTH_USERNAME, password: AUTH_PASSWORD }))
    .use(pages)
  )
  .onStop(() => {
    logger.info('Server stopped')
  })