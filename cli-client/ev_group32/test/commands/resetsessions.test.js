const {expect, test} = require('@oclif/test')

describe('resetsessions', () => {
  test
  .stdout()
  .command(['resetsessions'])
  .do(output => expect(output.stdout).to.equal('Reset Successful\n'))
  .it()
})
