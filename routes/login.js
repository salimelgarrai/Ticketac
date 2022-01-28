var express = require('express')
var router = express.Router()

const mongoose = require('mongoose')
var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

/* GET login page. */
router.get('/', function (req, res, next) {
  console.log(req.session.message)
  var message = req.session.message
  req.session.message = undefined
  res.render('login', { message })
})

module.exports = router
