const express = require('express')
const router = express.Router()

const userLogin = require('../services/userLogin')
router.post('/login', userLogin)

const admin = require('./admin/admin')
router.use('/admin', admin)

module.exports = router
