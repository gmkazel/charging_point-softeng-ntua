const faker = require('faker')
const mongoose = require('mongoose')

const UserService = require('../services/userService')
const CreateVehicles = require('./createVehicles')
const createStation = require('./createStation')

const createVehicles = new CreateVehicles()

const user = new UserService()
module.exports = async () => {
  await createVehicles.createDataset('./electric_vehicles_data.json')

  for (let i = 0; i < 20; i++) { await createVehicleOwner() }
  console.log('Vehicle Owners Done')
  for (let i = 0; i < 20; i++) { await createElectricalOperators() }
  console.log('Electrical Operators Done')
  for (let i = 0; i < 20; i++) { await createStationOwner() }
  console.log('Station Owners Done')
  await createVehicles.dropDataset()
}

async function createVehicleOwner () {
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

  const someUser = await user.createUser(newuser)
  return someUser
}

async function createElectricalOperators () {
  // electrical company

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
  const someUser = await user.createUser(newuser)
  return someUser
}

async function createStationOwner () {
  const station = await createStation(20)
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
  const res = await user.createUser(newuser)
  return res
}
