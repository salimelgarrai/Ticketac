var mongoose = require('mongoose')

var lastSchema = mongoose.Schema({
    date: Date,
    journey: String,
    departureTime: String,
    price: Number,
})

var userSchema = mongoose.Schema({
    name: String,
    firstName: String,
    email:  String,
    password: String,
    lastTrip: [{lastSchema}]
})

module.exports = mongoose.model('users', userSchema)