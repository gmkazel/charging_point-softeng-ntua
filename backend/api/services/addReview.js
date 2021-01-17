const StationService = require('./stationService')
const mongoose = require('mongoose')

const stationService = new StationService()
module.exports = async (req, res, next) => {
  const userId = await req.params.userId
  const stationId = await req.params.stationId

  const check = (variable) => {
    return (typeof (variable) !== 'undefined' && variable !== null)
  }

  if (!(check(req.body) && check(stationId) && check(userId))) {
    res.status(400)
    res.send()
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
    res.send()
    return next('route')
  }
  next()
}
