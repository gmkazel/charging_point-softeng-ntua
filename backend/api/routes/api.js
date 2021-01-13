const express = require('express')
const router = express.Router()

const userLogin = require('../services/userLogin')
router.post('/login', userLogin)

const userLogout = require('../services/userLogout')
router.post('/login', userLogout)

const admin = require('./admin/admin')
router.use('/admin', admin)

module.exports = router
