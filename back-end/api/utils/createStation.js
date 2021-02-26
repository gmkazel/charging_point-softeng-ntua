const mongoose = require('mongoose')
const faker = require('faker')
const userModel = require('../models/User')
const stationModel = require('../models/Station')
const CreatePoints = require('./createPoints')

const createPoints = new CreatePoints()

module.exports = async (userCount) => {
  const random = getRandomInt(userCount)
  const randUser = await userModel.findOne({ account_type: 'vehicleOwner' }, 'username _id').skip(random)
  // console.log(randUser)
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
  const pointInstance = await createPoints.createPoints(getRndInteger(5, 10), stationID)
  const points = []
  const v = await stationModel.findByIdAndUpdate(stationID, {
    points: pointInstance.forEach((c) => {
      points.push({
        points: mongoose.Types.ObjectId(c._id)
      })
    })
  })

  return v
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
