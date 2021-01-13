const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const token = req.header('X-OBSERVATORY-AUTH')
  if (!token) return res.sendStatus(400)

  const verified = jwt.verify(token, process.env.TOKEN_SECRET)
  await changeAPIKey(verified._id, '').catch((err) => {
    console.log(err)
    res.sendStatus(400)
    return next('route')
  })
  res.header('X-OBSERVATORY-AUTH', '')
  res.sendStatus(200)
  next()
}

function changeAPIKey (userId, token) {
  const user = require('../models/User')
  return user.findByIdAndUpdate(userId, { api_key: token })
}
