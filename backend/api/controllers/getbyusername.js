const User = require('../../api/services/userService')
const user = new User()

exports.getByUsername = async function (name, callback) {
  user.getByUsername(name, res => {
    callback && callback(res)
  })
}
