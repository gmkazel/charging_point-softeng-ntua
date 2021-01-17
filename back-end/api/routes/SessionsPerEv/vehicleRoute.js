const express = require('express')
const router = express.Router()
const Session = require('../../services/vehicleService')
const session = new Session()

router.get('SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to', (req, res, next) => {
  session.getSessionsPerEV(req.params.vehicleID, req.params.yyyymmdd_from, req.params.yyyymmdd_to, (err, output) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else { res.send(output) }
  })
})

module.exports = router
