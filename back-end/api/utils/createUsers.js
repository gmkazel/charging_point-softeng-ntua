const faker = require('faker')
const mongoose = require('mongoose')
const fsLibrary = require('fs')

const UserService = require('../services/userService')
const CreateVehicles = require('./createVehicles')
const createStation = require('./createStation')

const createVehicles = new CreateVehicles()
const dict = {}
const user = new UserService()

module.exports = async (req, res) => {
  try {
    await createUsers()
    res.send({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send({ status: 'fail' })
  }
}
async function createUsers () {
  await createVehicles.createDataset('./electric_vehicles_data.json')

  for (let i = 0; i < 20; i++) { await createElectricalOperators() }
  console.log('Electrical Operators Done')
  for (let i = 0; i < 3; i++) { await createAdmin() }
  console.log('Admins Done')
  for (let i = 0; i < 70; i++) { await createVehicleOwner() }
  console.log('Vehicle Owners Done')
  for (let i = 0; i < 20; i++) { await createStationOwner() }
  console.log('Station Owners Done')
  const json = JSON.stringify(dict)
  fsLibrary.writeFile('./user_passwords.txt', json, 'utf8', (error) => {
    if (error) console.log('Error producing password txt file\n')
  })
  await createVehicles.dropDataset()
}

async function createVehicleOwner () {
  const carInstance = await createVehicles.createVehicle(getRndInteger(1, 3))
  const cars = []
  carInstance.forEach((c) => {
    cars.push({
      model: c.model,
      info: mongoose.Types.ObjectId(c._id)
    })
  })
  const usrnm = faker.internet.userName()
  const psw = faker.internet.password()
  dict[usrnm] = psw
  const newuser = {
    username: usrnm,
    password: psw,
    contact_info:
      {
        email: faker.internet.email(),
        phone: [faker.phone.phoneNumber()]
      },
    address: faker.fake('{{address.streetAddress}}, {{address.city}}'),
    cars: cars,
    payment_card: [{
      owner: faker.fake('{{name.lastName}}_{{name.firstName}}'),
      number: faker.finance.creditCardNumber(),
      cvv: faker.finance.creditCardCVV(),
      exp_date: '10/21'
    }]
  }
  const someUser = await user.createUserF(newuser)
  return someUser
}

async function createElectricalOperators () {
  // electrical company
  const usrnm = faker.fake('{{name.lastName}}_{{name.firstName}}')
  const psw = faker.internet.password()
  dict[usrnm] = psw
  const newuser = {
    username: usrnm,
    password: psw,
    account_type: 'electricalCompanyOperator',
    contact_info:
      {
        email: faker.internet.email(),
        phone: [faker.phone.phoneNumber()],
        website: faker.internet.domainName()
      },
    address: faker.fake('{{address.streetAddress}}, {{address.city}}'),
    cost_per_kwh: getRndFloat(0.2, 0.5),
    session_cost: getRndFloat(5, 10)
  }
  const someUser = await user.createUserF(newuser)
  return someUser
}

async function createStationOwner () {
  const station = await createStation(20)
  const usrnm = faker.fake('{{name.lastName}}_{{name.firstName}}')
  const psw = faker.internet.password()
  dict[usrnm] = psw
  const newuser = {
    username: usrnm,
    password: psw,
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

  const someUser = await user.createUserF(newuser)
  return someUser
}

async function createAdmin () {
  const usrnm = faker.fake('{{name.lastName}}_{{name.firstName}}')
  const psw = faker.internet.password()
  dict[usrnm] = psw
  const newuser = {
    username: usrnm,
    password: psw,
    contact_info:
    {
      email: faker.internet.email(),
      phone: [faker.phone.phoneNumber()]
    },
    account_type: 'admin'
  }
  const someUser = await user.createUserF(newuser)
  return someUser
}

function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getRndFloat (min, max) {
  return ((Math.random() * (max - min)) + min).toFixed(2)
}
