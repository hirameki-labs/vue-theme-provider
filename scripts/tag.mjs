/* eslint-disable node/prefer-global/process */
import { execa } from 'execa'
import packageJSON from '../package.json' with { type: 'json' }

const { version } = packageJSON

async function tag() {
  const tagName = `v${version}`
  await execa('git', ['tag', '-a', `${tagName}`, '-m', `Release ${tagName}`], {
    stdio: 'inherit',
  }).catch((error) => {
    console.error(error.shortMessage)
    process.exit(1)
  })

  console.log(`Tagged with ${tagName}`)
}

await tag()
