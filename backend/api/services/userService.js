const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = class UserService {
  async createUser (user, res) {
    const now = new Date()
    const token = jwt.sign({ _id: user.id, username: user.username, account_type: user.account_type, date: now }, process.env.TOKEN_SECRET)
    user.api_key = token
    bcrypt.hash(user.password, parseInt(process.env.SALTROUNDS)).then(function (hash) {
      user.password = hash
      User.create(user, (err) => {
        if (err) {
          res.status(400).send(err)
        } else {
          res.send('User created')
        }
      })
    })
  }

  async changeUserPassword (name, newpwd) {
    const hash = bcrypt.hashSync(newpwd, parseInt(process.env.SALTROUNDS))
    return User.findOneAndUpdate({ username: name }, { password: hash })
  }

  getByUsername (name, cb) {
    User.find({ username: name }, (err, doc) => {
      cb(err, doc)
    })
  }
}
