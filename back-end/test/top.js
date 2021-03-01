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
