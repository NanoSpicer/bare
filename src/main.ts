import { logger } from '@logging'
import { server } from './server'
import { applyMigrations } from './database/migration'
import { initializeDB } from './database/seed'
import { configuration } from '@configuration'

const port = configuration.PORT

await applyMigrations()
await initializeDB()

server.listen(port, app => {
  const root = configuration.APP_ROOT || '/'
  const origin = `http://localhost:${app.port}${root}`
  logger.info(`Application ready at ${origin}`)
})