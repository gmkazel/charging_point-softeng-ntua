const express = require('express')
const router = express.Router()
const AuthService = require('../services/authService')

const authService = new AuthService()
const vehicleOwnerAuth = authService.verifyVehicleOwner
const stationOwnerAuth = authService.verifyStationOwner

const StationEndpoint = require('../services/stationEndpoint')
const stationEndpoint = new StationEndpoint()

router.post('/addreview/:userId/:stationId', vehicleOwnerAuth, stationEndpoint.addReview)

router.post('/add/:userId', stationOwnerAuth, stationEndpoint.addStation)

router.post('/edit/:userId/:stationId', stationOwnerAuth, stationEndpoint.editStation)

router.post('/delete/:userId/:stationId', stationOwnerAuth, stationEndpoint.deleteStation)

module.exports = router
