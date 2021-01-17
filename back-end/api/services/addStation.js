const StationService = require('./stationService')

const stationService = new StationService()
module.exports = async (req, res, next) => {
  const userId = await req.params.userId
  const cand = await req.body

  const check = (variable) => {
    return (typeof (variable) !== 'undefined' && variable !== null)
  }

  if (!(check(cand) && check(userId))) {
    res.status(400)
    res.send()
    return next('route')
  }

  try {
    const result = await stationService.add(userId, cand)
    res.send(result)
    next()
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send()
    return next('route')
  }
  next()
}
