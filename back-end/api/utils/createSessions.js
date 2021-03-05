const mongoose = require('mongoose')
const sessionModel = require('../models/Session')
const pointModel = require('../models/Point')
const vehicleModel = require('../models/Vehicle')
const userModel = require('../models/User')
const stationModel = require('../models/Station')

const paymentType = ['Bank Card', 'PayPal']
let startDate = randomDate(new Date(2018, 0, 1), new Date(2020, 0, 1))
let startKilometers = 100

module.exports = async (req, res) => {
  try {
    for (let i = 0; i < 500; i++) {
      startDate = addDays(startDate, 1)
      startKilometers += 100
      await createSessions(startDate, startKilometers)
    }
    res.send({ status: 'OK' })
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send({ status: 'failed' })
  }
}

async function createSessions (date, kilometers) {
  const random = getRandomInt(70)
  const random1 = getRandomInt(100)
  const randVehicle = await vehicleModel.findOne({}, '_id').skip(random)
  const randPoint = await pointModel.findOne({}, '_id').skip(random1)
  const randStation = await stationModel.findOne({ points: randPoint._id }, 'energy_provider')
  const randUser = randStation.energy_provider

  const newSession = {
    cost_per_kwh: getRndFloat(0.2, 0.5),
    session_cost: getRndFloat(5, 10),
    payment: paymentType[getRandomInt(0, 1)],
    start_date: date,
    end_date: addHours(date, getRndInteger(2, 8)),
    current_kilometers: kilometers,
    energy_delivered: getRndFloat(25, 35),
    protocol: 'OCPP2.0',
    price_policy_ref: '18 cents per kilowatt hour(kWh)',
    car: mongoose.Types.ObjectId(randVehicle._id),
    point: mongoose.Types.ObjectId(randPoint._id),
    energy_provider_used: mongoose.Types.ObjectId(randUser._id)
  }

  const res = await sessionModel.create(newSession)
  const sessionID = res._id
  await pointModel.findByIdAndUpdate(randPoint._id, { $push: { sessions: mongoose.Types.ObjectId(sessionID) } })
  await vehicleModel.findByIdAndUpdate(randVehicle._id, { $push: { sessions: mongoose.Types.ObjectId(sessionID) } })
  await userModel.findByIdAndUpdate(randUser._id, { $push: { electricalCompanyOperatorSessions: mongoose.Types.ObjectId(sessionID) } })
}

function getRndFloat (min, max) {
  return ((Math.random() * (max - min)) + min).toFixed(2)
}

function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function randomDate (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function addHours (date, hours) {
  const copy = new Date(Number(date))
  copy.setHours(date.getHours() + hours)
  return copy
}

function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}
