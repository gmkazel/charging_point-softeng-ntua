const User = require('../services/userService')
const user = new User()

exports.createUser = async function (name, callback) {
  user.createUser(name, res => {
    callback && callback(res)
  })
}
