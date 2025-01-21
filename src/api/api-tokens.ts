import Elysia, { t } from "elysia";
import { createToken, deleteToken, getTokens } from "../data/api-tokens";



export const apiTokens = new Elysia({ prefix: '/tokens'})
  .post('/', ({ body }) => createToken(body.name), {
    body: t.Object({
      name: t.String({
        minLength: 4
      })
    })
  })
  .delete('/:id', async ({ params, set}) => {
    await deleteToken(params.id)
    set.status = 200
  },{
    params: t.Object({
      id: t.String({
        format: 'uuid'
      })
    })
  })
  .get('/', () => getTokens())
  