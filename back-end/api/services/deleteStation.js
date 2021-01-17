const StationService = require('./stationService')

const stationService = new StationService()
module.exports = async (req, res, next) => {
  const userId = await req.params.userId
  const stationId = await req.params.stationId

  const check = (variable) => {
    return (typeof (variable) !== 'undefined' && variable !== null)
  }

  if (!(check(stationId) && check(userId))) {
    res.status(400)
    res.send()
    return next('route')
  }

  if (!stationService.ownedBy(userId, stationId)) {
    res.status(401)
    res.send()
    return res.next('routes')
  }

  try {
    const result = await stationService.delete(userId, stationId)
    res.send({ deleted: result })
    next()
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send()
    return next('route')
  }
  next()
}
