const common = require('./common')
const importTest = common.importTest

describe('API root', function () {
  importTest('POST /login', './api/routes/login.js')
  importTest('POST /logout', './api/routes/logout.js')
  //   importTest('Admin', './api/routes/admin.js')
  //   importTest('stationmod', './api/routes/admin.js')
})
