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
      console.log('Username does not exist')
      res.sendStatus(400)
    } else if (name.length === 0) {
      res.sendStatus(402)
    } else {
      res.send(name)
    }
  })
})

// empty username. Bad request
router.get('/users', (req, res) => {
  res.sendStatus(400)
})

router.post('/usermod/:username/:password', async (req, res) => {
  await user.getByUsername(req.params.username, async (err, name) => {
    if (err) {
      res.sendStatus(400)
    } else if (name.length === 0) {
      try {
        // if username does not exist
        await user.createUser({ username: req.params.username, password: req.params.password })
        res.send('User created')
      } catch {
        res.sendStatus(400)
      }
    } else {
      // change user password
      await user.changeUserPassword(req.params.username, req.params.password)
      res.send('Password changed')
    }
  })
})

router.post('/usermod', (req, res) => {
  res.sendStatus(400)
})

router.post('/usermod/:username', (req, res) => {
  res.sendStatus(400)
})

module.exports = router
