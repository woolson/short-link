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

  const shortDom = resData.match(/https:\/\/url.cn\/(\w|\d)+/g)[0]
  if (shortDom) {
    return shortDom
  } else {
    throw new Error('Convert Failed!')
  }
}