const faker = require('faker')
const mongoose = require('mongoose')

const UserService = require('../services/userService')
const CreateVehicles = require('./createVehicles')
const createStation = require('./createStation')

const createVehicles = new CreateVehicles()

module.exports = async () => {
  const user = new UserService()
  await createVehicles.createDataset('./electric_vehicles_data.json')
  // const vehiclesCount = await createVehicles.getVehiclesCount()

  // vehicle owner
  for (let i = 0; i < 100; i++) {
    const carInstance = await createVehicles.createVehicle(1)
    const newuser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      contact_info:
      {
        email: faker.internet.email(),
        phone: [faker.phone.phoneNumber()]
      },
      address: faker.fake('{{address.streetAddress}}, {{address.city}}'),
      cars: [{
        model: carInstance[0].model,
        info: mongoose.ObjectId(carInstance[0]._id)
      }],
      payment_card: [{
        owner: faker.fake('{{name.lastName}}_{{name.firstName}}'),
        number: faker.finance.creditCardNumber(),
        cvv: faker.finance.creditCardCVV(),
        exp_date: '10/21'
      }]

    }
    await user.createUser(newuser)
  }
  console.log('Vehicle Owners Done')

  // electrical company
  for (let i = 0; i < 6; i++) {
    const newuser = {
      username: faker.fake('{{name.lastName}}_{{name.firstName}}'),
      password: faker.internet.password(),
      account_type: 'electricalCompanyOperator',
      contact_info:
      {
        email: faker.internet.email(),
        phone: [faker.phone.phoneNumber()],
        website: faker.internet.domainName()
      },
      address: faker.fake('{{address.streetAddress}}, {{address.city}}')
    }
    await user.createUser(newuser)
  }
  console.log('Electrical Operators Done')

  // station owner
  for (let i = 0; i < 6; i++) {
    const station = await createStation()
    const newuser = {
      username: faker.fake('{{name.lastName}}_{{name.firstName}}'),
      password: faker.internet.password(),
      contact_info:
      {
        email: faker.internet.email(),
        phone: [faker.phone.phoneNumber()],
        website: faker.internet.domainName()
      },
      address: faker.fake('{{address.streetAddress}}, {{address.city}}'),
      account_type: 'stationOwner',
      stations: [{
        name: station.name,
        info: mongoose.Types.ObjectId(station._id)
      }]
    }

    const user = new UserService()
    user.createUser(newuser)
  }

  console.log('Station Owners Done')
  await createVehicles.dropDataset()
}
