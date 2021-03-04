const express = require('express')
const router = express.Router()
const verifyStationOwner = require('../services/verifyStationOwner')

const StationEndpoint = require('../services/stationEndpoint')
const stationEndpoint = new StationEndpoint()

router.post('/addreview/:userId/:stationId', stationEndpoint.addReview)

router.post('/add/:userId', verifyStationOwner, stationEndpoint.addStation)

router.post('/edit/:userId/:stationId', verifyStationOwner, stationEndpoint.editStation)

router.post('/delete/:userId/:stationId', verifyStationOwner, stationEndpoint.deleteStation)

module.exports = router
