import { $ } from 'bun'
import chalk from 'chalk'

async function bundleAssets() {
  await $`cp -r assets dist/`.quiet()
  console.log(
    chalk.bgGreen('Bundled assets into dist/assets')
  )
}

await bundleAssets()
process.exit(0)


