/* eslint-disable unicorn/filename-case */
/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
const {Command, flags} = require('@oclif/command')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('config')

axios.defaults.httpsAgent = new https.Agent()

class estimatedTime extends Command {
  async run() {
    try {
      const {flags} = this.parse(estimatedTime)
      const status = await axios.get(`${config.BASE_URL}/estimatedTime/${flags.ev}/${flags.capacity}`)
      console.log(status.data)
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

estimatedTime.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
  ev: flags.string({
    required: true,
    description: 'the id of the car to search',
  }),
  capacity: flags.string({
    required: true,
    description: 'the current capacity of the car',
  }),
}

estimatedTime.description = 'return the estimated time for the car to charge'

module.exports = estimatedTime
