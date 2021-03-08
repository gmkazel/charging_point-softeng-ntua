/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
const {Command, flags} = require('@oclif/command')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
require('dotenv').config()
axios.defaults.httpsAgent = new https.Agent()

class HealthCheck extends Command {
  async run() {
    try {
      const {flags} = this.parse(HealthCheck)
      const status = await axios.get(`${process.env.BASE_URL}/admin/healthcheck`)
      console.log(status.data)
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

HealthCheck.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
}

HealthCheck.description = 'tests live server for errors'

module.exports = HealthCheck
