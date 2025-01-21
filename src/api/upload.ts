import { integer } from 'drizzle-orm/sqlite-core';
import Elysia, { error, t } from "elysia"
import { deleteFileById, getFileById, getFiles, saveFile } from "../data/uploads"

const uploadById = (id: string) => `/api/uploads/${id}`

export const uploads = new Elysia({ prefix: '/uploads' })
  .get('/', () => getFiles())
  .get('/:id', async ({ params }) => {
    const file = await getFileById(params.id)
    if (!file) {
      return error(404)
    }

    return new Response(file.contents, {
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': `inline; filename="${file.name}"`
      }
    })

  }, {
    params: t.Object({
      id: t.String({
        format: 'uuid'
      })
    })
  })
  .delete('/:id', async ({ params, set}) => {
    await deleteFileById(params.id)
    set.status = 200
  })
  .post('/', async ({ body }) => {
    const { id } = await saveFile(body)
    return new Response(null, {
      status: 201,
      headers: {
        'Location': uploadById(id)
      }
    })
  }, {
    body: t.Object({
      file: t.File(),
      meta: t.ObjectString({
        tags: t.Array(t.String())
      })
    }),
  })