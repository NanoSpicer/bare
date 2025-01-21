import { server } from '../src/server'

type FetchArgs = Parameters<typeof fetch>[1]

export function useTestServer(port: number) {
  const origin = `http://localhost:${port}`
  return {
    origin,
    fetch: (path: string, args: FetchArgs = undefined) => fetch(`${origin}${path}`, args),
    start: () => server.listen(port),
    stop: () => server.stop(true)
  }
}