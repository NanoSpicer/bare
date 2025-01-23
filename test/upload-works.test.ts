import { test, expect, beforeAll, afterAll } from 'bun:test'
import { useTestServer } from './test-server'
import { db } from '../src/db'
import { apiTokens } from '../src/database/schema'
import { eq } from 'drizzle-orm'
import { url } from '@routes'

const server = useTestServer(8080)

const testToken = {
  name: 'test-token',
  token: crypto.randomUUID()
}

beforeAll(async () => {
  await db.insert(apiTokens).values(testToken)
  server.start()
})

afterAll(async () => {
  await db.delete(apiTokens).where(
    eq(apiTokens.name, testToken.name)
  )
})


test("Can upload a simple file", async () => {

  const fileName = 'test/nana.jpg'
  const bunFile = Bun.file(fileName)
  const contents = await bunFile.arrayBuffer()

  const file = new File(
    [new Uint8Array(contents)],
    bunFile.name ?? fileName, {
      type: bunFile.type,
      lastModified: bunFile.lastModified
    }
  )

  const meta = {
    tags: ['nana', 'cute']
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("meta", JSON.stringify(meta))

  const upload = (token: string | undefined = undefined) => server.fetch(url('/api/uploads'), {
    method: 'POST',
    body: formData,
    headers: {
      ...(token ? { ['X-Api-Token']: token} : {})
    }
  })
  
  // No token should be 401
  let response = await upload(undefined)
  expect(response.status).toBe(401)

  response = await upload(testToken.token)
  expect(response.status).toBe(201)
  const location = response.headers.get('Location')
  expect(location).toBeTruthy()
  expect(location).toStartWith(url('/api/uploads/'))

  const download = (token: string | undefined = undefined) => server.fetch(location!+`?api_token=${token}`, {
    method: 'GET'
  })
  // Attempt to download the file
  let fileResponse = await download(undefined) 
  expect(fileResponse.status).toBe(401)

  fileResponse = await download(testToken.token)  
  expect(fileResponse.status).toBe(200)
  expect(fileResponse.headers.get('Content-Type')).toBe(bunFile.type)

  const hasInsertedFile = await server.fetch(url('/api/uploads'), {
    method: 'GET',
    headers: {
      'X-Api-Token': testToken.token
    }
  })
  expect(hasInsertedFile.status).toBe(200)
  const files = await hasInsertedFile.json()
  expect(files).toBeInstanceOf(Array)
  expect(files.length).toBeGreaterThanOrEqual(1)
})



