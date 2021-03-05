const common = require('../../../common')

const chai = common.chai
const server = common.server
const config = common.config
const deleteDatabase = common.deleteDatabase
const createUsers = common.createUsers
const Station = common.Station

let token
let randStationOwner
let randElectricalCompanyOperator
let randStation

before(async () => {
  await deleteDatabase()
  await createUsers()
  token = await common.createAdminAndLogin()
  randElectricalCompanyOperator = await common.pickRandomElectricalCompanyOperator()
  randStationOwner = await common.pickRandomStationOwner()
  randStation = randStationOwner.stations[0].info
  randStation = await Station.findById(randStation)
})

it('it should edit the name of a station', async () => {
  randStation.name = 'randomStation'
  randStation.operator = 'randomOperator'
  randStation.energy_provider = randElectricalCompanyOperator._id

  const res = await chai.request(server)
    .post(config.BASE_URL + '/stationmod/edit/' + randStationOwner._id + '/' + randStation._id)
    .set('X-OBSERVATORY-AUTH', token)
    .send(randStation)

  res.should.have.status(200)
  const checkEntry = await Station.findById(randStation._id)
  const checkName = (checkEntry.name === randStation.name)
  const checkOperator = (checkEntry.operator === randStation.operator)
  checkName.should.be.equal(true)
  checkOperator.should.be.equal(true)
})

it('it should not edit the name of a station- not right owner', async () => {
  try {
    const newrandStationOwner = await common.pickRandomStationOwner()
    randStation.name = 'randomStation'
    randStation.operator = 'randomOperator'
    randStation.energy_provider = randElectricalCompanyOperator._id

    const res = await chai.request(server)
      .post(config.BASE_URL + '/stationmod/edit/' + newrandStationOwner._id + '/' + randStation._id)
      .set('X-OBSERVATORY-AUTH', token)
      .send(randStation)

    res.should.have.status(400)
  } catch (err) {
    err.should.not.be.equal(undefined)
  }
})
