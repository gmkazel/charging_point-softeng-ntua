const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'))
}

require('./api/utils/initDB')()

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

const api = require('./api/routes/api')
app.use(config.BASE_URL, api)

mongoose.connection.on('connected', () => {
  app.listen(config.PORT, function () {
    console.log('Server is listening at port ' + config.PORT)
    app.emit('appStarted')
  })
})

module.exports = app
