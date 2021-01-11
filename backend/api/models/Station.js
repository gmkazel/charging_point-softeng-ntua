const mongoose = require('mongoose')

const StationSchema = mongoose.Schema({
  name: String,
  address: {
    type: String,
    minLength: 1,
    maxLength: 255
  },
  contact_info: {
    email: {
      type: String,
      minLength: 5,
      maxLength: 255
    },
    phone: [{
      type: String
    }],
    website: {
      type: String,
      maxLength: 2000
    }
  },
  operator: String,
  number_of_active_points: {
    type: Number,
    default: 0
  },
  total_energy_delivered: {
    type: Number,
    default: 0
  },
  points: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Points',
      required: true
    }
  ],
  energy_provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    date: {
      type: Date,
      required: true
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }]
})

const Station = mongoose.model('Station', StationSchema)
module.exports = { Station }
