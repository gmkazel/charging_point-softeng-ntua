const express = require('express')
// const { result } = require('lodash')
const router = express.Router()
const User = require('../models/User')
const Session = require('../models/Session')
const Point = require('../models/Point')
const Station = require('../models/Station')
const SessionService = require('../services/sessionService')

const myService = new SessionService()

router.get('/userCards/:userID', async (req, res, next) => {
  try {
    const userId = req.params.userID
    const myCards = await User.find({ _id: userId }, 'payment_card')

    res.send(myCards)
  } catch (err) {
    res.sendStatus(400)
    console.log(err)
  }
})

// router.post('/userCards/addCard/:userID/:owner/:cardNumber/:cvv/:expDate', (req, res, next) => {
//   try {
//     const userId = req.params.userID
//     const owner = req.params.owner
//     const cardNumber = req.params.cardNumber
//     const cvv = req.params.cvv
//     const expDate = req.params.expDate

//     User.findByIdAndUpdate(userId,
//       { $push: { payment_card: { owner: owner, number: cardNumber, cvv: cvv, exp_date: expDate } } })
//     res.send({ payment_card: { owner: owner, number: cardNumber, cvv: cvv, exp_date: expDate } })
//   } catch (err) {
//     console.log(err)
//     res.status(400)
//     res.send()
//   }
// })

router.get('/stationsVisited/:userID', async (req, res, next) => {
  try {
    const userId = req.params.userID
    const myStations = []

    const myCars = await User.find({ _id: userId }, 'cars', (err) => {
      if (err) console.log(err)
    })

    let carSessions, myElement, currStation
    for (const i in myCars[0].cars) {
      carSessions = await Session.find({ car: myCars[0].cars[i].info }, 'point start_date', (err) => {
        if (err) console.log(err)
      })
      for (const j in carSessions) {
        currStation = await Point.find({ _id: carSessions[j].point }, 'station')
        myElement = {
          station: currStation[0].station,
          date: carSessions[j].start_date
        }
        myStations.push(myElement)
      }
    }
    myStations.sort((a, b) => b.date - a.date)

    // can be input as a parameter from the api call
    const requestedLength = 5
    res.send(myStations.slice(0, requestedLength))
  } catch (err) {
    res.sendStatus(400)
    console.log(err)
  }
})

router.get('/userCars/:userID', async (req, res, next) => {
  const userId = req.params.userID
  try {
    const myCars = await User.find({ _id: userId }, 'cars', (err) => {
      if (err) console.log(err)
    })
    res.send(myCars[0].cars)
  } catch (err) {
    res.sendStatus(400)
    console.log(err)
  }
})

router.get('/userCars/analytics/:userID/:carID/:startDate/:endDate', async (req, res, next) => {
  try {
    const userId = req.params.userID
    const carId = req.params.carID
    const startDate = req.params.startDate
    const endDate = req.params.endDate

    const result = []
    let myElement

    const myCars = await User.find({ _id: userId }, 'cars', (err) => {
      if (err) console.log(err)
    })

    if (carId === 'all') {
      for (const i in myCars[0].cars) {
        const carSessions = await myService.getSessionsPerEV(myCars[0].cars[i].info, startDate, endDate)

        myElement = {
          _id: myCars[0].cars[i].info,
          sessions: carSessions.VehicleChargingSessionsList
        }
        result.push(myElement)
      }
    } else {
      const carSessions = await myService.getSessionsPerEV(carId, startDate, endDate)

      result.push({
        _id: carId,
        sessions: carSessions.VehicleChargingSessionsList
      })
    }

    res.send(result)
  } catch (err) {
    res.sendStatus(400)
    console.log(err)
  }
})

router.get('/getAllSessions/:userID', async (req, res, next) => {
  try {
    const userId = req.params.userID

    let result = []

    const myCars = await User.find({ _id: userId }, 'cars', (err) => {
      if (err) console.log(err)
    })
    for (const i in myCars[0].cars) {
      const carSessions = await Session.find({ car: myCars[0].cars[i].info }, (err) => {
        if (err) console.log(err)
      })
      result = result.concat(carSessions)
    }
    result.sort((a, b) => b.start_date - a.start_date)

    res.send(result)
  } catch (err) {
    res.sendStatus(400)
    console.log(err)
  }
})

router.get('/getStationsAndPoints/:userID', async (req, res, next) => {
  try {
    const userId = req.params.userID

    const result = []

    const myStationsAux = await User.find({ _id: userId }, 'stations', (err) => {
      if (err) console.log(err)
    })
    const myStations = myStationsAux[0].stations

    for (const i in myStations) {
      const StationPoints = await Station.find({ _id: myStations[i].info }, 'address points', (err) => {
        if (err) console.log(err)
      })
      const myElement = {
        _id: myStations[i].info,
        name: myStations[i].name,
        points: StationPoints[0].points
      }
      result.push(myElement)
    }
    res.send(result)
  } catch (err) {
    res.sendStatus(400)
    console.log(err)
  }
})

router.get('/getStationsAndReviews/:userID', async (req, res, next) => {
  try {
    const userId = req.params.userID

    const result = []

    const myStationsAux = await User.find({ _id: userId }, 'stations', (err) => {
      if (err) console.log(err)
    })
    const myStations = myStationsAux[0].stations

    for (const i in myStations) {
      const StationReviews = await Station.find({ _id: myStations[i].info }, 'reviews', (err) => {
        if (err) console.log(err)
      })
      const myElement = {
        _id: myStations[i].info,
        reviews: StationReviews[0].reviews
      }
      result.push(myElement)
    }
    res.send(result)
  } catch (err) {
    res.sendStatus(400)
    console.log(err)
  }
})

module.exports = router
