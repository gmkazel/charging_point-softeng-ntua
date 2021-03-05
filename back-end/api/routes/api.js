const express = require('express')
const router = express.Router()
const userAuth = require('../services/verifyUser')

const userLogin = require('../services/userLogin')
router.post('/login', userLogin)

const userLogout = require('../services/userLogout')
router.post('/logout', userAuth, userLogout)

const admin = require('./admin/admin')
router.use('/admin', admin)

const stationmod = require('./stationmod.js')
router.use('/stationmod', userAuth, stationmod)

const sessions = require('./sessions.js')
router.use('', sessions)

const queriesAux = require('./queriesAux.js')
router.use('/queries', queriesAux)

module.exports = router
