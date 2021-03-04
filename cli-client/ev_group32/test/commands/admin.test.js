const {expect, test} = require('@oclif/test')
const __homedir = require('os').homedir()
const fs = require('fs')
const faker = require('faker')
const path = require('path')

const usrnm = faker.internet.userName()
describe('admin: add new user', () => {
  test
  .stdout()
  .command([
    'admin',
    '--usermod',
    '--username',
    `${usrnm}`,
    '--passw',
    'pasok',
    '--apikey',
    fs.readFileSync(__homedir + '/softeng20bAPI.token', {encoding: 'utf8', flag: 'r'}),
  ])
  .do(output => expect(output.stdout).to.equal('[object Object]\n'))
  .it()
})

describe('admin: modify existing user', () => {
  test
  .stdout()
  .command([
    'admin',
    '--usermod',
    '--username',
    `${usrnm}`,
    '--passw',
    'PASOK',
    '--apikey',
    fs.readFileSync(__homedir + '/softeng20bAPI.token', {encoding: 'utf8', flag: 'r'}),
  ])
  .do(output => {
    expect(output.stdout).to.equal('Changed user password\n')
  })
  .it()
})

describe('admin: find user', () => {
  test
  .stdout()
  .command(['admin', '--users', '--username', `${usrnm}`, '--apikey', fs.readFileSync(__homedir + '/softeng20bAPI.token',
    {encoding: 'utf8', flag: 'r'})])
  .do(output => {
    const log = `{ "username": "${usrnm}" }`
    expect(output.stdout).to.contain(JSON.parse(log))
  })
  .it()
})

describe('upload csv', () => {
  test
  .stdout()
  .command(['admin', '--sessionsupd', '--source', `${path.join(__dirname,  '/example.csv')}`, '--apikey', fs.readFileSync(__homedir + '/softeng20bAPI.token',
    {encoding: 'utf8', flag: 'r'})])
  .do(output => {
    const log = '{ "SessionsInUploadedFile": "Int", "SessionsImported": "Int", "TotalSessionsInDatabase": "Int" }'
    expect(output.stdout).to.contain(JSON.parse(log))
  })
  .it()
})
