const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

const api = require('./api/routes/api')

mongoose.connect(config.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to database')
})

app.listen(config.PORT, function () {
  console.log('Server is listening at port ' + config.PORT)
})

app.use(config.BASE_URL, api)
