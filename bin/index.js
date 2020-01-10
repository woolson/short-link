#!/usr/bin/env node

const program = require('commander')
const clipboard = require('clipboardy')
const chalk = require('chalk')
const { convert } = require('../src/index')
const { loading } = require('../src/loading')
const { logger } = require('../src/logger')

program
  .version(require('../package').version)
  .option('-c, --clipboard', 'get long link from clip board')
  .parse(process.argv)

async function main() {
  try {
    let longLink = program.args[0]
    if (program.clipboard) {
      longLink = clipboard.readSync()
    }
    if (!longLink) {
      logger.fail('Please enter long link!')
    }
    loading.start()
    const shortLink = await convert(longLink)
    loading.stop()
    clipboard.writeSync(shortLink)
    logger.info(`Link has copied, press ${chalk.bold('Ctrl/Cmd + C')} to paste.`)
    logger.info(`${chalk.bold.underline(shortLink)}`)
  } catch (err) {
    loading.stop()
    logger.fail(`Convert failed: ${err.message}`)
  }
}
main()