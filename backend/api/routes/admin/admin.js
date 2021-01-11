const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/healthcheck', (req, res) => {
  if (mongoose.connection.readyState === 1) { res.send({ status: 'OK' }) } else {
    res.send({ status: 'failed' })
  }
})

module.exports = router
