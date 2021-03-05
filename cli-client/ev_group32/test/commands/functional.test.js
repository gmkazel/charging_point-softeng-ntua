/* eslint-disable node/no-unsupported-features/node-builtins */
const {expect, test} = require('@oclif/test')
const __homedir = require('os').homedir()
const fs = require('fs')
const {exec} = require('child_process')
const config = require('config')
const faker = require('faker')

const usrnm = faker.internet.userName()
const params = new URLSearchParams()
params.append('username', config.DEFAULT_USER_NAME)
params.append('password', config.DEFAULT_USER_PASSWORD)

describe('login', () => {
  test
  .stdout()
  .command(['login', '--username', 'admin', '--passw', 'petrol4ever'])
  .do(output => expect(output.stdout).to.equal('Successful login!\n'))
  .it()
})

describe('healthCheck', () => {
  test
  .stdout()
  .command(['healthcheck'])
  .do(output => {
    let log = '{ "status": "OK" }'
    expect(output.stdout).to.contain(JSON.parse(log))
  })
  .it()
})

describe('resetsessions', () => {
  test
  .stdout()
  .command(['resetsessions'])
  .do(output => expect(output.stdout).to.equal('Reset Successful\n'))
  .it()
})

describe('admin', () => {
  it('admin: add new user', () => {
    exec(`ev_group32 admin --usermod --username ${usrnm} --passw pasok --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`, (error, stdout) => {
      expect(stdout).to.equal('[object Object]\n')
    })
  })
})

describe('admin', () => {
  it('admin: modify existing user', () => {
    exec(`ev_group32 admin --usermod --username ${usrnm} --passw PASOK --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`, (error, stdout) => {
      expect(stdout).to.equal('Changed user passwordfsdafsd\n')
    })
  })
})

describe('admin', () => {
  it('admin: find user', () => {
    const log = `{ "username": "${usrnm}" }`
    exec(`ev_group32 admin --users --username ${usrnm} --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`, (error, stdout) => {
      expect(stdout).to.contain(JSON.parse(log))
    })
  })
})

describe('admin', () => {
  it('upload csv', () => {
    const log = '{ "SessionsInUploadedFile": "Int", "SessionsImported": "Int", "TotalSessionsInDatabase": "Int" }'
    exec(`ev_group32 admin --sessionsupd --source ${__homedir + '/softeng20bAPI.token'} --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`, (error, stdout) => {
      expect(stdout).to.contain(JSON.parse(log))
    })
  })
})

describe('logout', () => {
  it('test', () => {
    exec(`ev_group32 logout --apikey ${fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})}`, (error, stdout) => {
      expect(stdout).to.equal('Successful logout!\n')
    })
  })
})
