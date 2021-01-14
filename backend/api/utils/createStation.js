const mongoose = require('mongoose')
const faker = require('faker')
const userModel = require('../models/User')
const stationModel = require('../models/Station')

module.exports = async () => {
  const userCount = await userModel.count({ account_type: 'electricalCompanyOperator' })

  const random = Math.floor(Math.random() * userCount)

  const randUser = await userModel.findOne({ account_type: 'electricalCompanyOperator' }).skip(random)

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
