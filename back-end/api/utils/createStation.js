const mongoose = require('mongoose')
const faker = require('faker')
const userModel = require('../models/User')
const stationModel = require('../models/Station')
const CreatePoints = require('./createPoints')
const config = require('config')
const createPoints = new CreatePoints()

module.exports = async (count) => {
  const userCount = config.dummyElectricalOperatorsCount
  const finalStations = []
  for (let i = 0; i < count; i++) {
    const random = getRandomInt(userCount)
    const randUser = await userModel.findOne({ account_type: 'electricalCompanyOperator' }, 'username _id').skip(random)
    const stationCity = faker.fake('{{address.city}}')
    const newStation = {
      name: 'ChargingPoint ' + stationCity + ' Station',
      address: faker.fake('{{address.streetAddress}}') + ', ' + stationCity,
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

    finalStations.push(v)
  }

  return finalStations
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
