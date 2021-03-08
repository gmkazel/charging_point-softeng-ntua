/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unsupported-features/node-builtins */

const {expect} = require('@oclif/test')
const __homedir = require('os').homedir()
const fs = require('fs')
const {exec} = require('child_process')
require('dotenv').config()
const faker = require('faker')

const usrnm = faker.internet.userName()
const params = new URLSearchParams()
params.append('username', process.env.DEFAULT_USER_NAME)
params.append('password', process.env.DEFAULT_USER_PASSWORD)

const util = require('util')

const execProm = util.promisify(exec)

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

describe('healthCheck', () => {
  it('simple test', async () => {
    const res = await runShellCommand('ev_group32 healthcheck')
    expect(res.stdout).to.equal('{ status: \'OK\' }\n')
  })
})

describe('resetsessions', () => {
  it('it resets all sessions', async () => {
    const res = await runShellCommand('ev_group32 resetsessions')
    expect(res.stdout).to.equal('Reset Successful\n')
  })
})

describe('login', () => {
  it('should login as admin', async () => {
    const res = await runShellCommand(`ev_group32 login --username ${process.env.DEFAULT_USER_NAME} --passw ${process.env.DEFAULT_USER_PASSWORD}`)
    expect(res.stdout).to.equal('Successful login!\n')
  })
  it('should not login user - no password', async () => {
    const res = await runShellCommand(`ev_group32 login --username ${process.env.DEFAULT_USER_NAME} --passw`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --passw expects a value\n')
  })
  it('should not login user - no username', async () => {
    const res = await runShellCommand(`ev_group32 login --passw ${process.env.DEFAULT_USER_PASSWORD} --username`)
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.contain('Error: Flag --username expects a value\n')
  })
  it('should not login user - empty parameters', async () => {
    const res = await runShellCommand('ev_group32 login --username --passw')
    expect(res.stdout).to.equal('')
    expect(res.stderr).to.equal('Error: Missing required flag:\n --passw PASSW  Your password\nSee more help with --help\n')
  })
})

describe('admin',  () => {
  it('it adds a new user', async () => {
    const res = await runShellCommand(`ev_group32 admin --usermod --username ${usrnm} --passw pasok --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`)
    expect(res.stdout).to.contain('token')
  })

  it('it modifies an existing user', async  () => {
    const res = await runShellCommand(`ev_group32 admin --usermod --username ${usrnm} --passw PASOK --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`)
    expect(res.stdout).to.equal('Changed user password\n')
  })

  it('it finds a user', async () => {
    const res = await runShellCommand(`ev_group32 admin --users --username ${usrnm} --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`)
    expect(res.stdout).to.contain(`username: '${usrnm}'`)
  })

  it('it uploads a csv', async () => {
    const res = await runShellCommand(`ev_group32 admin --sessionsupd --source ${__homedir + '/softeng20bAPI.token'} --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`)

    expect(res.stdout).to.contain('SessionsInUploadedFile')
  })
})

describe('sessionsPerEV',  () => {
  it('it finds a car in the db', async () => {
    const res = await runShellCommand(`ev_group32 sessionsPerEV --ev 6042291dd1625f851ae79ee5 --datefrom 20180101 --dateto 20200101 --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`)
    expect(res.stdout).to.contain('VehicleID')
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
