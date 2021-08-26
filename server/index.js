require('dotenv').config()
const path = require('path')
const express = require('express')
const PrismicDOM = require('prismic-dom')
const api = require('./utils/api')

const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use((_req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: api.linkResolver
  }
  res.locals.PrismicDOM = PrismicDOM
  next()
})

app.get('/', async (req, res) => {
  const getApi = await api.initApi(req)
  const defaults = await api.handleRequest(getApi)

  res.render('pages/home', { ...defaults })
})

app.get('/about', async (req, res) => {
  const getApi = await api.initApi(req)
  const defaults = await api.handleRequest(getApi)
  const about = await getApi.getSingle('about')

  res.render('pages/about', { ...defaults, about })
})

app.get('/detail/:uid', async (req, res) => {
  const getApi = await api.initApi(req)
  const defaults = await api.handleRequest(getApi)

  const product = await getApi.getByUID('product', req.params.uid, {
    fetchLinks: 'collection.title'
  })

  res.render('pages/detail', { ...defaults, product })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
