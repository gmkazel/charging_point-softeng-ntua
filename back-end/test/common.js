process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const config = require('config')
const { exec } = require('child_process')
chai.use(chaiHttp)

function deleteDatabase () {
  exec('mongo test --eval "db.dropDatabase()"', (error, stdout, stderr) => {
    if (error) throw (error)
  })
}

function importTest (name, path) {
  describe(name, function () {
    require(path)
  })
}

exports.server = server
exports.config = config
exports.should = should
exports.chai = chai
exports.assert = chai.assert
exports.importTest = importTest
exports.deleteDatabase = deleteDatabase
