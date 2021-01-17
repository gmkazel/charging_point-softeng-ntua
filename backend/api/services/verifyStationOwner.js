const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('X-OBSERVATORY-AUTH')
  if (!token) {
    res.status(200)
    res.send()
    return next('route')
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    if (verified.account_type === 'stationOwner'||verified.account_type === 'admin') {
      req.user = verified
      next()
    } else {
      res.status(401)
      res.send()
    }
  } catch (err) {
    res.status(400)
    res.send()
  }
}
