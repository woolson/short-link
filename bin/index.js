#!/usr/bin/env node

const program = require('commander')
const clipboard = require('clipboardy')
const chalk = require('chalk')
const { convert, validLink } = require('../src/index')
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
      logger.info('Clipboard content:', chalk.bold.underline(longLink))
    }
    if (!longLink || !validLink(longLink)) {
      logger.fail('Please enter a valid long link!')
      return
    }
    loading.start()
    const shortLink = await convert(longLink)
    loading.stop()
    clipboard.writeSync(shortLink)
    logger.info(`Link has copied, press ${chalk.bold('Ctrl/Cmd + C')} to paste.`)
    logger.succ(`${chalk.bold.underline(shortLink)}`)
  } catch (err) {
    loading.stop()
    logger.fail(`Convert failed: ${err.message}`)
  }
}
main()