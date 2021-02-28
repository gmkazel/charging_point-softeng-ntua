const express = require('express')
const router = express.Router()

const User = require('../../services/userService')
const user = new User()

const userAuth = require('../../services/verifyUser')
const verifyAdmin = require('../../services/verifyAdmin')

const upload = require('../../services/csvService')
const multiparty = require('multiparty')
const form = new multiparty.Form()

const resetsessions = require('../../services/resetSessions')
router.post('/resetsessions', resetsessions)

const createUsers = require('../../utils/createUsers')
router.get('/createUsers', createUsers)

const healthcheck = require('../../services/healthcheck')
router.get('/healthcheck', healthcheck)

router.get('/users/:username', userAuth, verifyAdmin, (req, res) => {
  user.getByUsername(req.params.username, (err, name) => {
    if (err) {
      res.status(400).send(err)
    } else {
      if (!Object.keys(name).length) {
        res.sendStatus(400)
      } else {
        res.send(name)
      }
    }
  })
})

router.post('/usermod/:username/:password', userAuth, verifyAdmin, async (req, res) => {
  await user.getByUsername(req.params.username, async (err, name) => {
    if (err) {
      res.status(400).send(err)
    } else if (!Object.keys(name).length) {
      await user.createUser({ username: req.params.username, password: req.params.password }, res)
    } else {
      await user.changeUserPassword(req.params.username, req.params.password)
      res.send('Changed user password')
    }
  })
})

router.post('/system/sessionsupd', (req, res) => {
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.sendStatus(400)
    }
    upload(files, res)
  })
})

// BAD REQUESTS

router.post('/usermod', (req, res) => {
  res.status(400).send('Insert username and password')
})

router.post('/usermod/:username', (req, res) => {
  res.status(400).send('Insert username and password')
})
router.get('/users', (req, res) => {
  res.status(400).send('Insert a username')
})
module.exports = router
