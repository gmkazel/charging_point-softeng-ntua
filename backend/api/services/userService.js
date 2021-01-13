const User = require('../models/User')
const bcrypt = require('bcrypt')

require('dotenv').config()

module.exports = class UserService {
  async createUser (user) {
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
