const {expect, test} = require('@oclif/test')

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
