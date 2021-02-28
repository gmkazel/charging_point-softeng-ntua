/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
const {Command, flags} = require('@oclif/command')

const https = require('https')
const axios = require('axios')
const chalk = require('chalk')
const config = require('../../config/config.json')
const fs = require('fs')
const __homedir = require('os').homedir()

axios.defaults.httpsAgent = new https.Agent()

class Logout extends Command {
  async run() {
    try {
      const {flags} = this.parse(Logout)
      axios.defaults.headers.common['X-OBSERVATORY-AUTH'] = flags.apikey
      await axios.post(`${config.BASE_URL}/logout`)
      console.log('Successful logout!')
      fs.unlinkSync((__homedir, '../../softeng20bAPI.token'))
    } catch (error) {
      console.error(chalk.red(error))
    }
  }
}

Logout.flags = {
  format: flags.string({
    options: ['json', 'csv'],
    required: true,
  }),
  apikey: flags.string({
    required: true,
    description: 'the api key used for authorization',
    default: '1',
  }),
}

Logout.description = 'logout of the current session using your api-key. The file \'softeng20bAPI.token\' is deleted'

module.exports = Logout
