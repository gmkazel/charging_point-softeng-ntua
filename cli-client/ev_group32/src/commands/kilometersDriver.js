/* eslint-disable unicorn/filename-case */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
const {Command, flags} = require('@oclif/command')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('config')
axios.defaults.httpsAgent = new https.Agent()

class kilometersDriven extends Command {
  async run() {
    try {
      const {flags} = this.parse(kilometersDriven)
      const data = await axios.get(`${config.BASE_URL}/KilometersDriven/${flags.sessionStart}/${flags.sessionEnd}`)
      if (data.data.result < 0) {
        console.log(chalk.red('session start is newer than session end'))
      } else {
        console.log(data.data)
      }
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

kilometersDriven.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
  sessionStart: flags.string({
    required: true,
    description: 'the starting session',
  }),
  sessionEnd: flags.string({
    required: true,
    description: 'the last session',
  }),
}

kilometersDriven.description = 'get kilometers driver between two sessions'

module.exports = kilometersDriven
