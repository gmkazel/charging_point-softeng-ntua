const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
  const token = req.header('X-OBSERVATORY-AUTH')
  if (!token) return res.sendStatus(400)

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)

    const apiKey = await getAPIKey(verified._id).catch((err) => {
      console.log(err)
      res.status(400)
      res.send()
      return next('route')
    })

    if (apiKey === null) {
      res.status(400)
      res.send()
      return next('route')
    }
    if (apiKey.api_key !== token) {
      res.status(401)
      res.send()
      return next('route')
    }

    req.user = verified
    next()
  } catch (err) {
    res.status(400)
    res.send()
  }
}

function getAPIKey (userId, token) {
  const user = require('../models/User')
  return user.findById(userId)
}
