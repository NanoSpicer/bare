import { configuration } from '@configuration'
import { server } from '../src/server'
import path from 'path'
import { logger } from '@logging'

type FetchArgs = Parameters<typeof fetch>[1]

export function useTestServer(port: number) {
  const origin = `http://localhost:${port}`
  return {
    origin,
    fetch: (pathname: string, args: FetchArgs = undefined) => {
      const endpoint = path.join(origin, pathname) 
      logger.info(`Fetching ${endpoint}`)
      return fetch(endpoint, args)
    },
    start: () => server.listen(port),
    stop: () => server.stop(true)
  }
}