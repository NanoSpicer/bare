import assert from 'assert'
import { $, sleep } from 'bun'
import { readdir } from 'fs/promises'
import path from 'path'
import chalk from 'chalk'

await $`mkdir -p dist/`.quiet()
async function bundleMigrations() {
  // await $`mkdir -p dist/migrations`.quiet()
  // const generateMigrationProc = $`bunx --bun drizzle-kit generate`.quiet().nothrow()
  // // hack due to a bug in drizzle-kit
  // await Promise.race([
  //   generateMigrationProc,
  //   sleep(500)
  // ])
  
  // await $`cp -r drizzle/ dist/migrations`.quiet()
  // console.log(
  //   chalk.bgGreen('Bundled migrations into dist/migrations/migration.sql')
  // )

  // For some reason "drizzle-orm" migrate is not working. so we'll just ship the DB
  await $`cp sqlite.db dist/`.quiet()

  console.log(
    chalk.bgGreen('Bundled the sqlite.db into dist/sqlite.db')
  )
}

async function bundleAssets() {
  await $`cp -r assets dist/`.quiet()
  console.log(
    chalk.bgGreen('Bundled assets into dist/assets')
  )
}

await bundleMigrations()
await bundleAssets()
process.exit(0)


