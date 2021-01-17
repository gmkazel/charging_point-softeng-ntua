const express = require('express')
const router = express.Router()
const verifyStationOwner = require('../services/verifyStationOwner')

const addReview = require('../services/addReview')
router.post('/addreview/:userId/:stationId', addReview)

const addStation = require('../services/addStation')
router.post('/add/:userId', verifyStationOwner, addStation)

const editStation = require('../services/editStation')
router.post('/edit/:userId/:stationId', verifyStationOwner, editStation)

const deleteStation = require('../services/deleteStation')
router.post('/delete/:userId/:stationId', verifyStationOwner, deleteStation)

module.exports = router
