const csv = require('csvtojson')
const Session = require('../models/Session')

const upload = async (req, res) => {
  if (req.file[0] === undefined) {
    return res.status(400).send({ message: 'Please upload a csv file!' })
  }
  csv()
    .fromFile(req.file[0].path)
    .then(function (jsonArrayObj) {
      Session.insertMany(jsonArrayObj, (err) => {
        if (err) {
          res.status(400).send(err)
        } else {
          res.send('File upload successfully!')
        }
      })
    })
}
module.exports = upload
