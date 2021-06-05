const path = require('path')
const express = require('express')
// const logger = require('morgan')
// const errorHandler = require('errorHandler')
// const bodyParser = require('body-parser')
// const methodOverride = require('method-override')
const Prismic = require('@prismicio/client')
const PrismicDOM = require('prismic-dom')
const api = require('./utils/api')

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, '..', 'public')))
// app.use(logger('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(methodOverride())
// app.use(errorHandler())

// if (process.env.NODE_ENV === 'development') {
//   app.use(errorHandler())
// }

app.use((_req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: api.linkResolver
  }
  res.locals.PrismicDOM = PrismicDOM
  next()
})

app.get('/', (req, res) => {
  res.render('pages/home')
})

app.get('/about', (req, res) => {
  api.initApi(req).then(api => {
    api.query(Prismic.Predicates.any('document.type', ['about', 'meta'])).then(response => {
      const { results } = response
      const [about, meta] = results

      res.render('pages/about', { about, meta })
    })
  })
})

app.get('/detail/:uid', (req, res) => {
  res.render('pages/detail')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
