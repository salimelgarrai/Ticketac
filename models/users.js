var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  name: String,
  firstName: String,
  email: String,
  password: String,
  role: String,
  lastTrip: [{ type: mongoose.Schema.Types.ObjectId, ref: 'journeys' }],
})

module.exports = mongoose.model('users', userSchema)
