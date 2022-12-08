var mongoose = require('mongoose');

const Trips = new mongoose.Schema({
    email: { type: String, default: '' },
    destination: { type: String, default: '' },
    bookingtime: { type: String, default: '' }
  });


  module.exports = mongoose.model('Trips', Trips)