const Prismic = require('@prismicio/client')

exports.linkResolver = doc => {
  if (doc.type === 'about') {
    return '/about'
  }

  if (doc.type === 'detail') {
    return `/detail/${doc.uid}`
  }

  return '/'
}

exports.initApi = req => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req
  })
}
