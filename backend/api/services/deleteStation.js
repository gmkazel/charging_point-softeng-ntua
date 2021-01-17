const StationService = require('./stationService')

const stationService = new StationService()
module.exports = async (req, res, next) => {
  const userId = await req.params.userId
  const stationId = await req.params.stationId

  const check = (variable) => {
    return (typeof (variable) !== 'undefined' && variable !== null)
  }

  if (!(check(stationId) && check(userId))) {
    res.sendStatus(400)
    return next('route')
  }

  if (!stationService.ownedBy(userId, stationId)) {
    res.sendStatus(401)
    return res.next('routes')
  }

  try {
    const result = await stationService.delete(userId, stationId)
    res.send({ deleted: result })
    next()
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
    return next('route')
  }
  next()
}
