const StationService = require('./stationService')

const stationService = new StationService()
module.exports = async (req, res, next) => {
  const userId = await req.params.userId
  const stationId = await req.params.stationId
  const cand = await req.body

  const check = (variable) => {
    return (typeof (variable) !== 'undefined' && variable !== null)
  }

  if (!(check(cand) && check(stationId) && check(userId))) {
    res.sendStatus(400)
    return next('route')
  }

  if (!await stationService.ownedBy(userId, stationId)) {
    res.sendStatus(401)
    return next('routes')
  }

  try {
    const result = await stationService.edit(stationId, cand)
    res.send(result)
    next()
  } catch (err) {
    res.sendStatus(400)
    return next('route')
  }
  next()
}
