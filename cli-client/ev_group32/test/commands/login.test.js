const {expect, test} = require('@oclif/test')

describe('login', () => {
  test
  .stdout()
  .command(['login', '--username', 'admin', '--passw', 'petrol4ever'])
  .do(output => expect(output.stdout).to.equal('Successful login!\n'))
  .it()
})
