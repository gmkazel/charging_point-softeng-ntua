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

  async getByUsername (name, callback) {
    await User.find({ username: name }, (err, doc) => {
      callback && callback(err, doc)
      throw err
    })
  }
}
