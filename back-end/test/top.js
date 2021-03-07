const common = require('./common')
const importTest = common.importTest

describe('base', function () {
  importTest('POST /login', './api/routes/login.js')
  importTest('POST /logout', './api/routes/logout.js')
})

describe('admin', function () {
  importTest('POST admin/usermod/:username/:password', './api/routes/admin/usermod.js')
  importTest('GET admin/users/:username', './api/routes/admin/users.js')
})

describe('stationmod', function () {
  importTest('POST /stationmod/addStation', './api/routes/stationmod/addStation.js')
  importTest('POST /stationmod/editStation', './api/routes/stationmod/editStation.js')
  importTest('POST /stationmod/deleteStation', './api/routes/stationmod/deleteStation.js')
  importTest('POST /stationmod/addReview', './api/routes/stationmod/addReview.js')
})

describe('sessions', function () {
  importTest('GET /SessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to', './api/routes/sessions/sessionsPerPoint.js')
  importTest('GET /SessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to', './api/routes/sessions/sessionsPerStation.js')
  importTest('GET /SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to', './api/routes/sessions/sessionsPerEV.js')
  importTest('GET /SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_to', './api/routes/sessions/sessionsPerProvider')
})
