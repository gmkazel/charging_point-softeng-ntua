const PointService = require('./pointService')
const pointService = new PointService()
const check = (variable) => {
  return (typeof (variable) !== 'undefined' && variable !== null)
}

module.exports = class {
  async getPoint (req, res, next) {
    const pointId = req.params.pointId
    if (!check(pointId)) {
      res.status(400)
      res.send(new Error('Point Id not in parameters'))
      return next('route')
    }

    try {
      if (!pointService.canAccess(req, pointId)) {
        res.status(401)
        res.send(new Error('User cannot access point'))
        return next('route')
      }
      const result = await pointService.get(pointId)
      res.send(result)
      next()
    } catch (err) {
      console.log(err)
      res.status(400)
      res.send(err)
      return next('route')
    }
    next()
  }

  async addPoint (req, res, next) {
    const stationId = req.params.stationId
    if (!check(stationId)) {
      res.status(400)
      res.send(new Error('Station Id not in parameters'))
      return next('route')
    }

    try {
      const result = await pointService.add(stationId)
      res.send(result)
      next()
    } catch (err) {
      console.log(err)
      res.status(400)
      res.send(err)
      return next('route')
    }
    next()
  }

  async removePoint (req, res, next) {
    const pointId = req.params.pointId
    if (!check(pointId)) {
      res.status(400)
      res.send(new Error('Point Id not in parameters'))
      return next('route')
    }

    try {
      if (!pointService.canAccess(req, pointId)) {
        res.status(401)
        res.send(new Error('User cannot access point'))
        return next('route')
      }
      await pointService.remove(pointId)
      res.send({ result: 'OK' })
      next()
    } catch (err) {
      console.log(err)
      res.status(400)
      res.send(err)
      return next('route')
    }
    next()
  }
}
