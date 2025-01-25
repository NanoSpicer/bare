import process from 'process'


export const configuration = {
  AUTH_USERNAME: process.env.AUTH_USERNAME,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD,
  APP_ROOT: process.env.APP_ROOT,
  /**
   * The path to the database file
   */
  DB_PATH: process.env.DB_PATH ?? 'sqlite.db',
} as const 


