const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell the name of the event!']
  },
  date: {
    type: Date,
    default: new Date(Date.now()).toISOString().split('T')[0]
    // required: [true, 'Please specify the date of the event!']
  },
  time: {
    type: String,
    default: new Date(Date.now()).toISOString().split('T')[1]
    // required: [true, 'Please specify the time of the event!']
  },
  description: {
    type: String,
    required: [true, 'Please provide description of the event!']
  },
  capacity: {
    type: Number,
    default: 10
    // required: [true, 'Please specify the capacity of the event!']
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Event', eventSchema);
