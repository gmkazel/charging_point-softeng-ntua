const common = require('./common')
const importTest = common.importTest

describe('base', function () {
  importTest('POST /login', './api/routes/login.js')
  importTest('POST /logout', './api/routes/logout.js')
})

describe('admin', function () {
  importTest('POST admin/usermod/:username/:password', './api/routes/admin/usermod.js')
  importTest('GET admin/users/:username', './api/routes/admin/users.js')
  // importTest('POST admin/system/sessionsupd', './api/routes/admin/sessionsupd.js')
})

describe('stationmod', function () {
  importTest('POST /stationmod/addStation', './api/routes/stationmod/addStation.js')
  importTest('POST /stationmod/editStation', './api/routes/stationmod/editStation.js')
  importTest('POST /stationmod/deleteStation', './api/routes/stationmod/deleteStation.js')
// importTest('POST /stationmod/addReview', './api/routes/station/addReview.js')
})
