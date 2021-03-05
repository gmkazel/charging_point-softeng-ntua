process.env.NODE_ENV = 'test'
const mongoose = require('mongoose')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../server')
const config = require('config')

const Station = require('../api/models/Station')
const User = require('../api/models/User')

const { exec } = require('child_process')
const suppressLogs = require('mocha-suppress-logs')

chai.use(chaiHttp)
suppressLogs()

function importTest (name, path) {
  describe(name, function () {
    require(path)
  })
}

async function deleteDatabase () {
  await exec('mongo test --eval "db.dropDatabase()"', (error, stdout, stderr) => {
    if (error) throw (error)
  })
}

async function pickRandomStation () {
  const random = getRndInteger(1, config.dummyStationOwnersCount)
  const station = await Station.findOne({}).skip(random)
  return station
}

async function pickRandomStationOwner () {
  const random = getRndInteger(1, config.dummyStationOwnersCount)
  const stationOwner = await User.findOne({ account_type: 'stationOwner' }).skip(random)
  return stationOwner
}

async function pickRandomElectricalCompanyOperator () {
  const random = getRndInteger(1, config.dummyElectricalCompanyOperator)
  const electricalCompanyOperator = await User.findOne({ account_type: 'electricalCompanyOperator' }).skip(random)
  return electricalCompanyOperator
}

async function pickRandomVehicleOwner () {
  const random = getRndInteger(1, config.dummyVehicleOwner)
  const vehicleOwner = await User.findOne({ account_type: 'vehicleOwner' }).skip(random)
  return vehicleOwner
}

function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const UserService = require('../api/services/userService')
const userService = new UserService()

const user = {
  username: config.DEFAULT_USER_NAME,
  password: config.DEFAULT_USER_PASSWORD
}

async function createAdminAndLogin () {
  await userService.createUserF({
    username: config.DEFAULT_USER_NAME,
    password: config.DEFAULT_USER_PASSWORD,
    account_type: 'admin'
  })

  const login = await chai.request(server)
    .post(config.BASE_URL + '/login')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(user)
  return login.body.token
}

const createUsers = require('../api/utils/createUsers')

exports.server = server
exports.config = config
exports.should = should
exports.chai = chai
exports.assert = chai.assert
exports.importTest = importTest
exports.mongoose = mongoose

exports.Station = Station
exports.User = User

exports.deleteDatabase = deleteDatabase
exports.pickRandomStation = pickRandomStation
exports.pickRandomStationOwner = pickRandomStationOwner
exports.pickRandomElectricalCompanyOperator = pickRandomElectricalCompanyOperator
exports.pickRandomVehicleOwner = pickRandomVehicleOwner
exports.createAdminAndLogin = createAdminAndLogin
exports.createUsers = createUsers
