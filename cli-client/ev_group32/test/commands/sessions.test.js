/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/node-builtins */

const {expect} = require('@oclif/test')
const {exec} = require('child_process')
const util = require('util')
const execProm = util.promisify(exec)
const Station = require('../../../../back-end/api/models/Station')
const User = require('../../../../back-end/api/models/User')
const Point = require('../../../../back-end/api/models/Point')
const Vehicle = require('../../../../back-end/api/models/Vehicle')

require('../testserver')

async function runShellCommand(command) {
  let result
  try {
    result = await execProm(command)
  } catch (error) {
    result = error
  }
  if (Error[Symbol.hasInstance](result))
    return

  return result
}

describe('sessions', () => {
  describe('sessionsPerEV',  () => {
    it('it finds a car in the db', async () => {
      const car = await Vehicle.findOne()
      const res = await runShellCommand(`ev_group32 sessionsPerEV --ev ${car._id} --datefrom 20160101 --dateto 20220101`)
      expect(res.stdout).to.contain(`VehicleID: '${car._id}'`)
      expect(res.stdout).to.contain('RequestTimestamp')
      expect(res.stdout).to.contain('PeriodFrom')
      expect(res.stdout).to.contain('PeriodTo')
      expect(res.stdout).to.contain('TotalEnergyConsumed')
      expect(res.stdout).to.contain('NumberOfVisitedPoints')
      expect(res.stdout).to.contain('NumberOfVehicleChargingSessions')
      expect(res.stdout).to.contain('VehicleChargingSessionsList')
    })
  })
  describe('sessionsPerPoint',  () => {
    it('it finds a point in the db', async () => {
      const point = await Point.findOne()
      const res = await runShellCommand(`ev_group32 sessionsPerPoint --point ${point._id} --datefrom 20180101 --dateto 20200101`)
      expect(res.stdout).to.contain(`Point: '${point._id}'`)
      expect(res.stdout).to.contain('PointOperator')
      expect(res.stdout).to.contain('RequestTimestamp')
      expect(res.stdout).to.contain('PeriodFrom')
      expect(res.stdout).to.contain('PeriodTo')
      expect(res.stdout).to.contain('NumberOfChargingSessions')
      expect(res.stdout).to.contain('ChargingSessionsList')
    })
  })
  describe('sessionsPerProvider',  () => {
    it('it finds an electrical company operator in the db', async () => {
      const user = await User.findOne({account_type: 'electricalCompanyOperator'})
      const res = await runShellCommand(`ev_group32 sessionsPerProvider --provider ${user._id} --datefrom 20180101 --dateto 20200101`)
      expect(res.stdout).to.contain(`ProviderID: '${user._id}'`)
      expect(res.stdout).to.contain('ProviderName')
      expect(res.stdout).to.contain('SessionsSummaryList')
    })
  })
  describe('sessionsPerStation',  () => {
    it('it finds a station in the db', async () => {
      const station = await Station.findOne()
      const res = await runShellCommand(`ev_group32 sessionsPerStation --station ${station._id} --datefrom 20180101 --dateto 20200101`)
      expect(res.stdout).to.contain(`StationID: '${station._id}'`)
      expect(res.stdout).to.contain('Operator')
      expect(res.stdout).to.contain('RequestTimestamp')
      expect(res.stdout).to.contain('PeriodFrom')
      expect(res.stdout).to.contain('PeriodTo')
      expect(res.stdout).to.contain('TotalEnergyDelivered')
      expect(res.stdout).to.contain('NumberOfChargingSessions')
      expect(res.stdout).to.contain('NumberOfActivePoints')
      expect(res.stdout).to.contain('SessionsSummaryList')
    })
  })
})

describe('chargingPercentage', () => {
  it('it should return the charging percentage', async () => {
    const car = await Vehicle.findOne()
    const currentCapacity = getRndInteger(1, car.usable_battery_size)
    const res = await runShellCommand(`ev_group32 chargingPercentage --ev ${car._id} --capacity ${currentCapacity}`)
    expect(res.stdout).to.contain('result')
  })
  it('it should not return the percentage - greater capacity', async () => {
    const car = await Vehicle.findOne()
    const currentCapacity = getRndInteger(car.usable_battery_size + 1, car.usable_battery_size + 10)
    const res = await runShellCommand(`ev_group32 chargingPercentage --ev ${car._id} --capacity ${currentCapacity}`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.equal('Error: Request failed with status code 400\n')
  })
  it('it should not return the percentage - negative capacity', async () => {
    const car = await Vehicle.findOne()
    const res = await runShellCommand(`ev_group32 chargingPercentage --ev ${car._id} --capacity -1`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.equal('Error: Request failed with status code 400\n')
  })
  it('it should not return the percentage - no vehicleID', async () => {
    const res = await runShellCommand('ev_group32 chargingPercentage --capacity 1 --ev')
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --ev expects a value\n')
  })
  it('it should not return the percentage - no capacity', async () => {
    const car = await Vehicle.findOne()
    const res = await runShellCommand(`ev_group32 chargingPercentage --ev ${car._id} --capacity`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --capacity expects a value\n')
  })
})

describe('estimatedTimeAndCost', () => {
  it('it should return the estimated time and cost of normal mode', async () => {
    const car = await Vehicle.findOne()
    const currentCapacity = getRndInteger(1, car.usable_battery_size)
    const res = await runShellCommand(`ev_group32 estimatedTimeAndCost --ev ${car._id} --capacity ${currentCapacity} --mode normal`)
    expect(res.stdout).to.contain('time')
    expect(res.stdout).to.contain('cost')
  })
  it('it should return the estimated time and cost of fast mode', async () => {
    const car = await Vehicle.findOne()
    const currentCapacity = getRndInteger(1, car.usable_battery_size)
    const res = await runShellCommand(`ev_group32 estimatedTimeAndCost --ev ${car._id} --capacity ${currentCapacity} --mode fast`)
    expect(res.stdout).to.contain('time')
    expect(res.stdout).to.contain('cost')
  })
  it('it should not return estimated time and cost - invalid mode', async () => {
    const car = await Vehicle.findOne()
    const currentCapacity = getRndInteger(1, car.usable_battery_size)
    const res = await runShellCommand(`ev_group32 estimatedTimeAndCost --ev ${car._id} --capacity ${currentCapacity} --mode superfast`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.equal('Error: Request failed with status code 400\n')
  })
  it('it should not return estimated time and cost - greater capacity', async () => {
    const car = await Vehicle.findOne()
    const currentCapacity = getRndInteger(car.usable_battery_size + 1, car.usable_battery_size + 10)
    const res = await runShellCommand(`ev_group32 estimatedTimeAndCost --ev ${car._id} --capacity ${currentCapacity} --mode normal`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.equal('Error: Request failed with status code 400\n')
  })
  it('it should not return estimated time and cost - negative capacity', async () => {
    const car = await Vehicle.findOne()
    const res = await runShellCommand(`ev_group32 estimatedTimeAndCost --ev ${car._id} --capacity -1 --mode normal`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.equal('Error: Request failed with status code 400\n')
  })
  it('it should not return estimated time and cost - no vehicleID', async () => {
    const res = await runShellCommand('ev_group32 estimatedTimeAndCost --capacity 1 --mode normal --ev')
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --ev expects a value\n')
  })
  it('it should not return estimated time and cost - no capacity', async () => {
    const car = await Vehicle.findOne()
    const res = await runShellCommand(`ev_group32 estimatedTimeAndCost --ev ${car._id} --mode normal --capacity`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --capacity expects a value\n')
  })
  it('it should not return estimated time and cost - no mode', async () => {
    const car = await Vehicle.findOne()
    const currentCapacity = getRndInteger(1, car.usable_battery_size)
    const res = await runShellCommand(`ev_group32 estimatedTimeAndCost --ev ${car._id} --capacity ${currentCapacity} --mode`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --mode expects a value\n')
  })
})

describe('periodicBill', () => {
  it('it should return the periodicBill', async () => {
    const car = await Vehicle.findOne()
    const res = await runShellCommand(`ev_group32 periodicBill --ev ${car._id} --datefrom 20170101 --dateto 20220101`)
    expect(res.stdout).to.contain('result')
  })
  it('it should not return the periodicBill - no vehicleID', async () => {
    const res = await runShellCommand('ev_group32 periodicBill --datefrom 20170101 --dateto 20220101 --ev')
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --ev expects a value\n')
  })
  it('it should not return the periodicBill - no datefrom', async () => {
    const car = await Vehicle.findOne()
    const res = await runShellCommand(`ev_group32 periodicBill --ev ${car._id} --dateto 20220101 --datefrom`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --datefrom expects a value\n')
  })
  it('it should not return the periodicBill - no dateto', async () => {
    const car = await Vehicle.findOne()
    const res = await runShellCommand(`ev_group32 periodicBill --ev ${car._id} --datefrom 20170101 --dateto`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --dateto expects a value\n')
  })
})

describe('getCostPerStation', () => {
  it('it should return the cost of the station', async () => {
    const station = await Station.findOne()
    const res = await runShellCommand(`ev_group32 getCostPerStation --station ${station._id} --datefrom 20170101 --dateto 20220101`)
    expect(res.stdout).to.contain('result')
  })
  it('it should not return the cost of the station - no stationID', async () => {
    const res = await runShellCommand('ev_group32 getCostPerStation --datefrom 20170101 --dateto 20220101 --station')
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --station expects a value\n')
  })
  it('it should not return the cost of the station - no datefrom', async () => {
    const station = await Station.findOne()
    const res = await runShellCommand(`ev_group32 getCostPerStation --station ${station._id} --dateto 20220101 --datefrom`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --datefrom expects a value\n')
  })
  it('it should not return the cost of the station - no dateto', async () => {
    const station = await Station.findOne()
    const res = await runShellCommand(`ev_group32 getCostPerStation --station ${station._id} --datefrom 20170101 --dateto`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --dateto expects a value\n')
  })
})

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
