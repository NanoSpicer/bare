import process from 'process'


const megas = (value: number) => value * 1024 * 1024

function getMaxRequestBodySize(): number {
  const defaultSize = megas(200)
  const envVar = process.env.MAX_REQUEST_BODY_SIZE_MB

  if(!envVar ) {
    return defaultSize
  }

  if(!Number.isInteger(envVar)) {
    return defaultSize
  }

  return megas(+envVar)
}

export const configuration = {
  PORT: process.env.PORT ?? 8080,
  AUTH_USERNAME: process.env.AUTH_USERNAME,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD,
  APP_ROOT: process.env.APP_ROOT,
  /**
   * The path to the database file
   */
  DB_PATH: process.env.DB_PATH ?? 'sqlite.db',
  MAX_REQUEST_BODY_SIZE_MB: getMaxRequestBodySize(),
} as const


