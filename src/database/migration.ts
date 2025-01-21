import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from '../db'
import { logger } from '@logging'
import process from 'process'

export async function applyMigrations() {
  // For some reason "drizzle-orm" migrate is not working. so we'll just ship the DB
  if(Math.random() > 0) {
    return
  }
  const nodeEnv = process.env.NODE_ENV
  logger.info(`NODE_ENV: ${nodeEnv}`)
  if(!nodeEnv) {
    return 
  }

  if(nodeEnv.startsWith('prod')) {
    // Apply migrations only if we're the first instance in case of a cluster.
    logger.info('Applying migrations')
    // This doesn't work as per 21/01/2025
    migrate(db, {
      migrationsFolder: './migrations/',
    })
  }
}