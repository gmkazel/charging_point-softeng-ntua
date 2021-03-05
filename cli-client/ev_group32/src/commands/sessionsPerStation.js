/* eslint-disable unicorn/filename-case */
/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
const {Command, flags} = require('@oclif/command')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('../../config/config.json')

axios.defaults.httpsAgent = new https.Agent()

class SessionsPerStation extends Command {
  async run() {
    try {
      const {flags} = this.parse(SessionsPerStation)
      axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = flags.apikey
      const status = await axios.get(`${config.BASE_URL}/SessionsPerStation/${flags.station}/${flags.datefrom}/${flags.dateto}`)
      console.log(status.data)
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

SessionsPerStation.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
    default: 'json',
  }),
  apikey: flags.string({
    required: true,
    description: 'the api key used for authorization',
  }),
  station: flags.string({
    required: true,
    description: 'the id of the station to search',
  }),
  datefrom: flags.string({
    required: true,
  }),
  dateto: flags.string({
    required: true,
  }),
}

SessionsPerStation.description = 'return all charging sessions on a certain station'

module.exports = SessionsPerStation