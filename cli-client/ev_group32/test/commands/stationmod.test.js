/* eslint-disable camelcase */
/* eslint-disable node/no-unsupported-features/node-builtins */

const {expect} = require('@oclif/test')
const {exec} = require('child_process')
const util = require('util')
const execProm = util.promisify(exec)
const Station = require('../../../../back-end/api/models/Station')
const User = require('../../../../back-end/api/models/User')
const config = require('config')
const axios = require('axios')

const fs = require('fs')
const __homedir = require('os').homedir()

require('../testserver')

async function runShellCommand(command) {
  let result
  try {
    result = await execProm(command)
  } catch (error) {
    result = error
  }
  if (Error[Symbol.hasInstance](result))
    return

  return result
}

async function createDB() {
  await axios.post(`${config.BASE_URL}/admin/createUsers`)
  await axios.post(`${config.BASE_URL}/admin/createSessions`)
}

before(() => {
  createDB()
})

describe('sessions', () => {
  describe('login', () => {
    it('should login as admin', async () => {
      const res = await runShellCommand(`ev_group32 login --username ${config.DEFAULT_USER_NAME} --passw ${config.DEFAULT_USER_PASSWORD}`)
      expect(res.stdout).to.equal('Successful login!\n')
    })
  })
  describe('addReview',  () => {
    it('it adds a review in the db', async () => {
      const user = await User.findOne()
      const station = await Station.findOne()
      const res = await runShellCommand(`ev_group32 addReview --user ${user._id} --station ${station._id} --rating 5 --comment 'Excellent!' --date 20191021 --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
        {encoding: 'utf8', flag: 'r'})}`)
      expect(res.stdout).to.contain('name')
      expect(res.stdout).to.contain('contact_info')
      expect(res.stdout).to.contain('points')
      expect(res.stdout).to.contain('operator')
      expect(res.stdout).to.contain('energy_provider')
      expect(res.stdout).to.contain('reviews')
      expect(res.stdout).to.contain('address')
      expect(res.stdout).to.contain('added')
    })
  })
  describe('addStation',  () => {
    it('it adds a station in the db', async () => {
      const user = await User.findOne({account_type: 'stationOwner'})
      const energyProv = await User.findOne({account_type: 'electricalCompanyOperator'})
      const res = await runShellCommand(`ev_group32 addStation --user ${user._id} --stationName '54 Vincenzo Island, Robelton' --address '242 Brycen Mews, East Ansel' --energyProvider ${energyProv._id} --operator Tamara.Pagac69 --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
        {encoding: 'utf8', flag: 'r'})}`)
      expect(res.stdout).to.contain('name')
      expect(res.stdout).to.contain('contact_info')
      expect(res.stdout).to.contain('points')
      expect(res.stdout).to.contain('_id')
      expect(res.stdout).to.contain('address')
      expect(res.stdout).to.contain('operator')
      expect(res.stdout).to.contain('energy_provider')
      expect(res.stdout).to.contain('reviews')
    })
  })
  describe('editStation',  () => {
    it('it edits a station in the db', async () => {
      const station = await Station.findOne()
      const stationOwner = await User.findOne({'stations.info': station._id})
      const energyProv = await User.findOne({account_type: 'electricalCompanyOperator'})
      const res = await runShellCommand(`ev_group32 editStation --station ${station._id} --stationName '54 Vincenzo Island, Robelton' --address '242 Brycen Mews, East Ansel' --energyProvider ${energyProv._id} --operator Tamara.Pagac69 --user ${stationOwner._id} --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
        {encoding: 'utf8', flag: 'r'})}`)
      expect(res.stdout).to.equal('\n')
    })
  })
  describe('deleteStation',  () => {
    it('it deletes a station in the db', async () => {
      const station = await Station.findOne()
      const stationOwner = await User.findOne({'stations.info': station._id})
      const res = await runShellCommand(`ev_group32 deleteStation --station ${station._id} --user ${stationOwner._id} --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
        {encoding: 'utf8', flag: 'r'})}`)
      expect(res.stdout).to.equal('{ deleted: true }\n')
    })
  })
  describe('logout', () => {
    it('logout for current user', () => {
      exec(`ev_group32 logout --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
        {encoding: 'utf8', flag: 'r'})}`, (error, stdout) => {
        expect(stdout).to.equal('Successful logout!\n')
      })
    })
  })
})
