const mongoose = require('mongoose')
const faker = require('faker')
const userModel = require('../models/User')
const stationModel = require('../models/Station')

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
    energy_provider: mongoose.Types.ObjectId(randUser._id)
  }

  return await stationModel.create(newStation)
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}
