const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../../services/userService')
const user = new User()

router.get('/healthcheck', (req, res) => {
  if (mongoose.connection.readyState === 1) { res.send({ status: 'OK' }) } else {
    res.send({ status: 'failed' })
  }
})

router.get('/users/:username', (req, res) => {
  user.getByUsername(req.params.username, (err, name) => {
    if (err) {
      res.status(400)
    } else {
      res.send(name)
    }
  })
})

router.post('/usermod/:username/:password', (req, res) => {
  try {
    user.createUser({ username: req.params.username, password: req.params.password })
    res.send('Successful insert')
  } catch {
    res.send('Problem!')
  }
})
module.exports = router
