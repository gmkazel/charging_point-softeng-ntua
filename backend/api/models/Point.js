const mongoose = require('mongoose')

const PointSchema = mongoose.Schema({
  charging_mode: Number,
  total_energy_delivered: Number,
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
      required: true
    }
  ],
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  }
})

module.exports = mongoose.model('Point', PointSchema)
