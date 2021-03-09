const express = require('express')
const router = express.Router()

const PointEndpoint = require('../services/pointEndpoint')
const pointEndpoint = new PointEndpoint()

router.get('/get/:pointId', pointEndpoint.getPoint)

router.post('/add/:stationId', pointEndpoint.addPoint)

router.post('/delete/:pointId', pointEndpoint.removePoint)

module.exports = router
