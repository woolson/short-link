const ora = require('ora')
const { prefix } = require('./logger')

exports.loading = ora({prefixText: prefix})