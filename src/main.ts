import { logger } from '@logging'
import { server } from './server'
import { applyMigrations } from './database/migration'
import { initializeDB } from './database/seed'

const env = new Map(Object.entries(process.env))
const port = env.has('PORT') ? +env.get('PORT')! : 8080

await applyMigrations()
await initializeDB()

server.listen(port, app => {
  const root = process.env.APP_ROOT || '/'
  const origin = `http://localhost:${app.port}${root}`
  logger.info(`Application ready at ${origin}`)
})