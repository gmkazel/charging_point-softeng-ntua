const mongoose = require('mongoose')

const SessionSchema = mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  point: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Point',
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  price_policy_ref: Number,
  cost_per_kw: Number,
  session_cost: Number,
  current_kilometers: {
    type: Number,
    required: true
  },
  energy_delivered: {
    type: Number,
    required: true
  },
  energy_provider_used: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  protocol: {
    type: String,
    required: true
  },
  payment: {
    type: String,
    enum: ['Bank Card', 'PayPal'],
    required: true
  }
})

module.exports = mongoose.model('Session', SessionSchema)
