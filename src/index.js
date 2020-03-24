const request = require('request-promise-native')

/** Converter API */
exports.CONVERT_API = 'http://tool.chinaz.com/tools/dwz.aspx'

/**
 * Converter
 * @param { String } longLink link need to convert
 */
exports.convert = async function (longLink) {
  const resData = await request({
    url: exports.CONVERT_API,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      longurl: longLink,
      aliasurl: ''
    }).toString()
  })

  const shortLink = resData.match(/id="shorturl">http(\w|\d|\/|:|\.)+/g)
  if (shortLink && shortLink[0]) {
    return shortLink[0].replace('id="shorturl">', '')
  } else {
    throw new Error('Convert Failed!')
  }
}

/**
 * Check link availability
 * @param {string} link enter link
 */
exports.validLink = function (link) {
  return `${link}`.slice(0, 4).toLowerCase() === 'http'
}