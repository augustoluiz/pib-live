require('marko/node-require').install()
require('marko/express')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use('/estatico', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
    extended: true
}))

const routes = require('../app/routes/routes')
routes(app)

module.exports = app