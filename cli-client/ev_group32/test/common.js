/* eslint-disable camelcase */
process.env.NODE_ENV = 'test'
const mongoose = require('mongoose')

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../../../back-end/server')
const config = require('config')

const dayjs = require('dayjs')
const Station = require('../../../back-end/api/models/Station')
const User = require('../../../back-end/api/models/User')
const Point = require('../../../back-end/api/models/Point')
const Session = require('../../../back-end/api/models/Session')
const Vehicle = require('../../../back-end/api/models/Vehicle')

const {exec} = require('child_process')
const suppressLogs = require('mocha-suppress-logs')

const UserService = require('../../../back-end/api/services/userService')
const userService = new UserService()

const defaultUser = {
  username: config.DEFAULT_USER_NAME,
  password: config.DEFAULT_USER_PASSWORD,
}

chai.use(chaiHttp)
suppressLogs()

function importTest(name, path) {
  describe(name, function () {
    require(path)
  })
}

async function deleteDatabase() {
  await exec('mongo test --eval "db.dropDatabase()"', error => {
    if (error) throw (error)
  })
}

async function createSessions() {
  await chai.request(server)
  .post(config.BASE_URL + '/admin/createSessions')
}

async function createAdminAndLogin() {
  await userService.createUserF({
    username: config.DEFAULT_USER_NAME,
    password: config.DEFAULT_USER_PASSWORD,
    account_type: 'admin',
  })

  const login = await chai.request(server)
  .post(config.BASE_URL + '/login')
  .set('content-type', 'application/x-www-form-urlencoded')
  .send(defaultUser)
  return login.body.token
}

class pickRandom {
  async station() {
    const random = getRndInteger(1, config.dummyStationOwnersCount)
    const station = await Station.findOne({}).skip(random)
    return station
  }

  async stationOwner() {
    const random = getRndInteger(1, config.dummyStationOwnersCount)
    const stationOwner = await User.findOne({account_type: 'stationOwner'}).skip(random)
    return stationOwner
  }

  async electricalCompanyOperator() {
    const random = getRndInteger(1, config.dummyElectricalCompanyOperator)
    const electricalCompanyOperator = await User.findOne({account_type: 'electricalCompanyOperator'}).skip(random)
    return electricalCompanyOperator
  }

  async vehicleOwner() {
    const random = getRndInteger(1, config.dummyVehicleOwner)
    const vehicleOwner = await User.findOne({account_type: 'vehicleOwner'}).skip(random)
    return vehicleOwner
  }

  async vehicle() {
    const random = getRndInteger(1, config.dummyVehicleOwner)
    const vehicle = await Vehicle.findOne().skip(random)
    return vehicle
  }

  async point() {
    const random = getRndInteger(1, config.dummyMinPoints * config.dummyStationOwnersCount)
    const point = await Point.findOne({ }).skip(random)
    return point
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const createUsers = require('../../../back-end/api/utils/createUsers')

exports.server = server
exports.config = config
exports.should = should
exports.chai = chai
exports.assert = chai.assert
exports.importTest = importTest
exports.mongoose = mongoose
exports.dayjs = dayjs

exports.Station = Station
exports.User = User
exports.Session = Session

exports.deleteDatabase = deleteDatabase
exports.pickRandom = pickRandom
exports.createAdminAndLogin = createAdminAndLogin
exports.createUsers = createUsers
exports.createSessions = createSessions
exports.getRndInteger = getRndInteger
