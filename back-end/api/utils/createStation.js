const mongoose = require('mongoose')
const faker = require('faker')
const userModel = require('../models/User')
const stationModel = require('../models/Station')
const CreatePoints = require('./createPoints')
const config = require('config')
const createPoints = new CreatePoints()

module.exports = async () => {
  const userCount = config.dummyElectricalOperatorsCount
  const random = getRandomInt(userCount)
  const randUser = await userModel.findOne({ account_type: 'electricalCompanyOperator' }, 'username _id').skip(random)
  const newStation = {
    name: faker.fake('{{address.streetAddress}}, {{address.city}}'),
    address: faker.fake('{{address.streetAddress}}, {{address.city}}'),
    contact_info:
      {
        email: faker.internet.email(),
        phone: [faker.phone.phoneNumber()]
      },
    operator: faker.internet.userName(),
    energy_provider: mongoose.Types.ObjectId(randUser._id)
  }

  const res = await stationModel.create(newStation)
  const stationID = res._id
  const pointInstance = await createPoints.createPoints(getRndInteger(config.dummyMinPoints, config.dummyMaxPoints), stationID)
  const pointsList = []

  pointInstance.forEach((c) => {
    pointsList.push(mongoose.Types.ObjectId(c._id))
  })

  const v = await stationModel.findByIdAndUpdate(stationID, {
    points: pointsList
  })

  return v
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}