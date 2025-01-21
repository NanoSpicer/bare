import Elysia from "elysia";
import { pages } from './pages';
import { basicAuth } from "./api/middleware/authentication";
import { api } from "./api";
import { logger } from "@logging";
import { requestLogging } from "./request-logging";
import process from 'process'

const {
  AUTH_USERNAME = 'admin',
  AUTH_PASSWORD = 'admin'
} = process.env


export const server = new Elysia()
  .use(requestLogging)
  .use(api)
  .use(app => app
    .onBeforeHandle({ as: 'local' }, basicAuth({ username: AUTH_USERNAME, password: AUTH_PASSWORD }))
    .use(pages)
  )
  .onStop(() => {
    logger.info('Server stopped')
  })