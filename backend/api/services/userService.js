const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = class UserService {
  async createUser (user) {
    const now = new Date()
    const token = jwt.sign({ _id: user.id, username: user.username, account_type: user.account_type, date: now }, process.env.TOKEN_SECRET)
    user.api_key = token
    bcrypt.hash(user.password, parseInt(process.env.SALTROUNDS)).then(function (hash) {
      user.password = hash
      User.create(user, (err) => {
        if (err) {
          throw err
        }
      })
    })
  }

  async changeUserPassword (name, newpwd) {
    bcrypt.hash(newpwd, parseInt(process.env.SALTROUNDS)).then(function (err, hash) {
      if (err) {
        throw err
      } else {
        return User.findOneAndUpdate({ username: name }, { password: hash })
      }
    })
  }

  getByUsername (name, callback) {
    User.find({ username: name }, (err, doc) => {
      if (err) {
        throw (err)
      }
      callback(err, doc)
    })
  }
}
