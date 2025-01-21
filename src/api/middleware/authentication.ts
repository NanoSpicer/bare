import { logger } from "@logging";
import { error } from "elysia";


interface BasicAuthOptions {
  username: string
  password: string
}

function encodeCredentials(username: string, password: string) {
  return Buffer.from(`${username}:${password}`).toString('base64')
}

export function basicAuth(options: BasicAuthOptions) {

  return async ({ headers, request }: { headers: Record<string, string|undefined>, request: Request }) => {
    const log = logger.child({ url: request.url })
    const auth = headers['authorization']
    if (!auth) {
      log.warn('Unauthorized request')
      return new Response('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="nano-backups"'
        }
      })
    }

    const [scheme, credentials] = auth.split(' ')
    const expected = encodeCredentials(options.username, options.password)

    if (scheme !== 'Basic' || credentials !== expected) {
      log.warn('Invalid credentials')
      return error(401)
    }
  } 
}