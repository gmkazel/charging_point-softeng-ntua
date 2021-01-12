const User = require('../models/User')
const bcrypt = require('bcrypt')

require('dotenv').config()

module.exports = class UserService {
  async createUser (name, pwd) {
    bcrypt.hash(pwd, parseInt(process.env.SALTROUNDS)).then(function (hash) {
      const user = new User({
        username: name,
        password: hash
      })
      User.create(user, (err) => {
        if (err) {
          console.log('Username ' + err.keyValue.username + ' already exists!')
        } else {
          console.log('User inserted successfully!')
        }
      })
    })
  }

  async getByUsername (name, callback) {
    await User.find({ username: name }, (err, doc) => {
      if (err) {
        console.log('Error finding user')
        throw err
      } else {
        callback && callback(doc)
      }
    })
  }
}
