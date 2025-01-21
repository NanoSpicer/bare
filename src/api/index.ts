import Elysia from "elysia";
import { apiTokens } from "./api-tokens";
import { uploads } from "./upload";
import { apiTokenMiddleware } from "./middleware/api-token";



export const api = new Elysia({ prefix: '/api' })
  .use(app => app
    .use(apiTokens)
  )
  .use(app => app
    // Only tokens can upload
    .onBeforeHandle({ as: 'local' }, apiTokenMiddleware)
    .use(uploads)
  )