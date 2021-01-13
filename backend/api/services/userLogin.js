require('dotenv').config('../..')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  const data = await getUserbyUsername(username).catch((err) => {
    console.log(err)
    res.sendStatus(400)
    return next('route')
  })

  if (data === null) {
    res.sendStatus(400)
    return next('route')
  }

  const hash = String(data.password)

  const comp = bcrypt.compareSync(password, hash)

  if (comp) {
    const now = new Date()
    const token = jwt.sign({ _id: data.id, username: data.username, account_type: data.account_type, date: now }, process.env.TOKEN_SECRET)
    await changeAPIKey(data.id, token).catch((err) => {
      console.log(err)
      res.sendStatus(400)
      return next('route')
    })

    res.header('X-OBSERVATORY-AUTH', token).send(token)
    next()
  } else {
    res.sendStatus(400)
    return next('route')
  }
}

function getUserbyUsername (usernameInput) {
  const user = require('../models/User')
  return user.findOne({ username: usernameInput })
}

function changeAPIKey (userId, token) {
  const user = require('../models/User')
  return user.findByIdAndUpdate(userId, { api_key: token })
}
