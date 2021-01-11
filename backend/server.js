require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const api = require('./api/routes/api')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to database')
})

app.listen(process.env.PORT, function () {
  console.log('Server is listening at port ' + process.env.PORT)
})

app.use(process.env.BASE_URL, api)
