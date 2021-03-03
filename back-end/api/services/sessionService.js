const Session = require('../models/Session')
const Station = require('../models/Station')
const Vehicle = require('../models/Vehicle')
const Point = require('../models/Point')
const User = require('../models/User')
const dayjs = require('dayjs')
const { toInteger } = require('lodash')

module.exports = class SessionService {
  deleteAll () {
    Session.Session.deleteMany()
      .then(() => {
        return true
      })
      .catch((errors) => {
        throw errors
      })
  }

  // ------------------------------------------------------------------------------------------------------------------

  async getSessionsPerPoint (pointId, startDate, endDate) {
    let result = {}

    const myStation = Session.find({ point: pointId }).select({ station: 1 }).exec(function (err, data) {
      if (err) console.log(err)
    })
    const myPointOperator = Station.find({ _id: myStation }).select({ operator: 1 }).exec(function (err, data) {
      if (err) console.log(err)
    })

    // Finding date and time of call
    const myRequestTimestamp = dayjs(new Date()).format('YYYY-MM-DD HH:MM:ss')

    const dateFrom = dayjs(startDate).format('YYYY-MM-DD HH:MM:ss')
    const dateTo = dayjs(endDate).format('YYYY-MM-DD HH:MM:ss')

    await Session.find(
      {
        point: pointId,
        start_date: {
          $gte: dateFrom,
          $lte: dateTo
        }
      }).sort({ start_date: 1 }).exec(function (err, data) {
      if (err) console.log(err)
      else {
        // Finding requested items and creating the list
        const myList = []

        for (const counter in data) {
          const myVehicle = data[counter].car

          Vehicle.findById(myVehicle, (err, car) => {
            if (err) console.log(err)
            else {
              const myElement = {
                SessionIndex: (toInteger(counter) + 1),
                SessionID: data[counter]._id,
                StartedOn: dateFrom,
                FinishedOn: dateTo,
                Protocol: data[counter].protocol,
                EnergyDelivered: data[counter].energy_delivered,
                Payment: data[counter].payment,
                VehicleType: car.type
              }
              myList.push(myElement)
            }
          })
        }
        result = {
          Point: pointId,
          PointOperator: myPointOperator,
          RequestTimestamp: myRequestTimestamp,
          PeriodFrom: dateFrom,
          PeriodTo: dateTo,
          NumberOfChargingSessions: data.length,
          ChargingSessionsList: myList
        }
      }
    })
    console.log(result)
    return result
  }

  // ----------------------------------------------------------------------------------------------------------------------------

  getSessionsPerStation (stationId, startDate, endDate) {
    const result = {}

    result.StationID = stationId

    result.Operator = Station.find({ _id: stationId }).select({ opeartor: 1 }).exec(function (err, data) {
      if (err) console.log(err)
    })

    // Finding date and time of call
    const currentDateTime = new Date()

    const currentDate = currentDateTime.toISOString().slice(0, 10)
    const currentTime = currentDateTime.toISOString().slice(11, 19)

    result.RequestTimestamp = `${currentDate} ${currentTime}`

    result.PeriodFrom = `${startDate.slice(0, 4)}:${startDate.slice(5, 7)}:${startDate.slice(8, 10)}`
    result.PeriodTo = `${endDate.slice(0, 4)}:${endDate.slice(5, 7)}:${endDate.slice(8, 10)}`

    const stationPoints = Station.find({ _id: stationId }).select({ points: 1 })

    let currentItem; let totalEnergy = 0; let totalChargingSessions = 0; let activePoints = 0
    const myList = []
    for (const item in stationPoints) {
      currentItem = getSessionsPerPoint(item, startDate, endDate)

      if (currentItem.NumberOfChargingSessions !== 0) {
        totalEnergy += currentItem.EnergyDelivered
        totalChargingSessions += currentItem.NumberOfChargingSessions
        activePoints++

        const myElement = {}
        myElement.PointID = currentItem.Point
        myElement.PointSessions = currentItem.NumberOfChargingSessions
        myElement.EnergyDelivered = currentItem.EnergyDelivered

        myList.push(myElement)
      }
    }
    result.TotalEnergyDelivered = totalEnergy
    result.NumberOfChargingSessions = totalChargingSessions
    result.NumberOfActivePoints = activePoints
    result.SessionsSummaryList = myList

    console.log(result)
    return result
  }

  // ----------------------------------------------------------------------------------------------------------------------------

  getSessionsPerEV (carID, fromDate, toDate) {
    // ISWS na 8elei:
    // const dateFrom = dayjs(fromDate, 'YYYYMMDD').format('YYYY-MM-DD HH:MM:SS')
    const dateFrom = dayjs(fromDate).format('YYYY-MM-DD HH:MM:SS')
    const dateTo = dayjs(toDate).format('YYYY-MM-DD HH:MM:SS')

    const output = {}

    output.VehicleID = carID
    output.RequestTimestamp = dayjs(new Date()).format('YYYY-MM-DD HH:MM:SS')
    output.PeriodFrom = dateFrom
    output.PeriodTo = dateTo
    output.TotalEnergyConsumed = Session.aggregate(
      [
        { $match: { car: carID } },
        { $group: { _id: '$car', sum: { $sum: '$energy_delivered' } } }
      ]).exec(function (err, data) {
      if (err) console.log(err)
    })

    const mySessions = Session.find(
      {
        start_date: {
          $gte: dateFrom,
          $lte: dateTo
        },
        car: carID
      }).exec(function (err, data) {
      if (err) console.group(err)
    })

    output.NumberOfVisitedPoints = mySessions.distinct('point').count().exec(function (err, data) {
      if (err) console.group(err)
    })

    output.NumberOfVehicleChargingSessions = mySessions.count().exec(function (err, data) {
      if (err) console.group(err)
    })

    const myList = [] // the list we want to show
    let counter = 1
    for (const object in mySessions) {
      const sessionObject = {}

      sessionObject.SessionIndex = counter
      sessionObject.SessionID = object._id
      sessionObject.EnergyProvider = object.energy_provider_used
      sessionObject.StartedOn = object.start_date
      sessionObject.FinishedOn = object.end_date
      sessionObject.EnergyDelivered = object.energy_delivered
      sessionObject.PricePolicyRef = object.price_policy_ref
      sessionObject.CostPerKWh = object.cost_per_kwh
      sessionObject.SessionCost = object.session_cost

      myList.push(sessionObject)
      counter++
    }
    output.VehicleChargingSessionsList = myList
    console.log(output)
    return output
  }

  // ----------------------------------------------------------------------------------------------------------------------------

  getSessionsPerProvider (providerId, startDate, endDate) {
    const result = {}

    result.ProviderID = providerId

    result.ProviderName = User.find({ _id: providerId }).select({ username: 1 }).exec(function (err, data) {
      if (err) console.log(err)
    })

    Session.find({
      energy_provider_used: providerId,
      start_date: {
        $gte: new Date(parseInt(startDate.slice(0, 4), 10), parseInt(startDate.slice(5, 7), 10), parseInt(startDate.slice(8, 10), 10)),
        $lte: new Date(parseInt(endDate.slice(0, 4), 10), parseInt(endDate.slice(5, 7), 10), parseInt(endDate.slice(8, 10), 10))
      }
    }).sort({ start_date: 1 }).exec(function (err, data) {
      if (err) console.log(err)
      else {
        const myList = []
        let myPoint
        for (const item in data) {
          const myElement = {}

          myPoint = item.point
          myElement.StationID = Point.find({ _id: myPoint }, (err, data) => {
            if (err) console.log(err)
          }).select({ station: 1 })

          myElement.SessionID = item._id
          myElement.VehicleID = item.car
          myElement.StartedOn = `${item.start_date.toISOString().slice(0, 10)} ${item.start_date.toISOString().slice(11, 19)}`
          myElement.FinishedOn = `${item.end_date.toISOString().slice(0, 10)} ${item.end_date.toISOString().slice(11, 19)}`
          myElement.EnergyDelivered = data.aggregate(
            [
              { $match: { point: myPoint } },
              { $group: { _id: '$point', total: { $sum: '$energy_delivered' } } }
            ])
          myElement.PricePolicyRef = item.price_policy_ref
          myElement.CostPerKWh = item.cost_per_kw
          myElement.TotalCost = item.session_cost

          myList.push(myElement)
        }
        result.myList = myList
      }
    })
    console.log(result)
    return result
  }
}
