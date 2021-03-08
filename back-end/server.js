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

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
  console.log('Closing http server.')
  app.close(() => {
    console.log('Http server closed.')
  })
})

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)

function shutDown () {
  console.log('Received kill signal, shutting down gracefully')
  app.close(() => {
    console.log('Closed out remaining connections')
    process.exit(0)
  })

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down')
    process.exit(1)
  }, 10000)
}
module.exports = app
