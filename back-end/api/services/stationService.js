const stationModel = require('../models/Station')
const userModel = require('../models/User')
const Joi = require('joi-oid')
const mongoose = require('mongoose')

module.exports = class {
  async ownedBy (userId, stationId) {
    const res = await userModel.findOne({ _id: userId, account_type: 'stationOwner', 'stations.info': mongoose.Types.ObjectId(stationId) })
    if (res) return true
    else return false
  }

  async add (userId, candidateStation) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(255).required(),
      address: Joi.string().min(1).max(255),
      energy_provider: Joi.objectId().required(),
      contact_info: {
        email: Joi.string().min(5).max(255),
        phone: Joi.string(),
        website: Joi.string().max(2000)
      },
      operator: Joi.string()
    })
    const { err, value } = schema.validate(candidateStation)
    if (err) throw err

    const res = await stationModel.create(candidateStation)

    const userRes = await userModel.findByIdAndUpdate(userId,
      { $push: { stations: { name: candidateStation.name, info: res._id } } })
    return (res)
  }

  async edit (stationId, candidateStation) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(255),
      address: Joi.string().min(1).max(255),
      energy_provider: Joi.objectId(),
      contact_info: {
        email: Joi.string().min(5).max(255),
        phone: Joi.string(),
        website: Joi.string().max(2000)
      },
      operator: Joi.string()
    })

    const { err, value } = schema.validate(candidateStation)
    if (err) throw err
    const res = await stationModel.findByIdAndUpdate(stationId, candidateStation)
    if (res === null) throw err
    const newres = await stationModel.findById(stationId)
    return (newres)
  }

  async delete (userId, stationId) {
    const stationRes = await stationModel.findByIdAndDelete(stationId)
    const userRes = await userModel.findByIdAndUpdate(userId,
      { $pull: { stations: { info: stationId } } })

    if (stationRes && userRes) return true
    else return false
  }

  async addReview (candidateReview, stationId) {
    const schema = Joi.object({
      date: Joi.date().required(),
      by: Joi.objectId().required(),
      rating: Joi.number().min(1).max(5).required(),
      comment: Joi.string()
    })

    const { error, value } = await schema.validate(candidateReview)
    if (error) { throw (error) }

    const res = await stationModel.findByIdAndUpdate(stationId,
      { $push: { comments: value } })
    return res
  }
}
