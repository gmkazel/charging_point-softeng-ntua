const StationService = require('./stationService')
const mongoose = require('mongoose')

const stationService = new StationService()

module.exports = class stationEndpoint {
  async addStation (req, res, next) {
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

  async deleteStation (req, res, next) {
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

    if (!stationService.canAccess(userId, stationId)) {
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

  async editStation (req, res, next) {
    const userId = await req.params.userId
    const stationId = await req.params.stationId
    const cand = await req.body

    const check = (variable) => {
      return (typeof (variable) !== 'undefined' && variable !== null)
    }

    if (!(check(cand) && check(stationId) && check(userId))) {
      res.status(400)
      res.send()
      return next('route')
    }

    if (!await stationService.canAccess(userId, stationId)) {
      res.status(401)
      res.send()
      return next('routes')
    }

    try {
      const result = await stationService.edit(stationId, cand)
      res.send(result)
      next()
    } catch (err) {
      res.status(400)
      res.send()
      return next('route')
    }
    next()
  }

  async addReview (req, res, next) {
    const userId = await req.params.userId
    const stationId = await req.params.stationId

    const check = (variable) => {
      return (typeof (variable) !== 'undefined' && variable !== null)
    }

    if (!(check(req.body) && check(stationId) && check(userId))) {
      res.status(400)
      res.send('Parameters required not found')
      return next('route')
    }

    const review = {
      date: req.body.date,
      by: mongoose.Types.ObjectId(userId),
      rating: req.body.rating,
      comment: req.body.comment
    }
    try {
      const result = await stationService.addReview(review, stationId)
      res.send({ added: result })
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
