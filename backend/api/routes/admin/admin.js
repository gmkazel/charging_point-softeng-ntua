const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const userController = require('../../controllers/getbyusername')

router.get('/healthcheck', (req, res) => {
  if (mongoose.connection.readyState === 1) { res.send({ status: 'OK' }) } else {
    res.send({ status: 'failed' })
  }
})

router.get('/users/:username', (req, res) => {
  userController.getByUsername(req.params.username, (name) => {
    res.send(name)
  })
})

module.exports = router
