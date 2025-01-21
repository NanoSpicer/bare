import { afterAll, beforeAll, expect, test } from 'bun:test'
import { useTestServer } from './test-server'

const testServer = useTestServer(8080)
beforeAll(testServer.start)
afterAll(testServer.stop)

test("cannot access pages without basic auth", async () => {
  
  const getHomePage = (headers?: any) => (
    testServer.fetch('/', {
      method: 'GET',
      headers
    })
  )

  const res = await getHomePage()
  expect(res.status).not.toBe(200)

  const creds = Buffer.from(`admin:admin`).toString('base64')
  const res2 = await getHomePage({
    authorization: ['Basic', creds].join(' ')
  })

  expect(res2.status).toBe(200)
})