/* eslint-disable node/no-unsupported-features/node-builtins */
const {expect, test} = require('@oclif/test')
const __homedir = require('os').homedir()
const fs = require('fs')

describe('logout', () => {
  it('logout', done => {
    test
    .stdout()
    .command(['logout', '--apikey', fs.readFileSync(__homedir + '/softeng20bAPI.token',
      {encoding: 'utf8', flag: 'r'})])
    .do(output => expect(output.stdout).to.equal('Successful logout!\n'))
    done()
  })
})
