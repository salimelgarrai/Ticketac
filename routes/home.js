var express = require('express')
var router = express.Router()

const mongoose = require('mongoose')
var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    res.render('index')
  }
})

router.get('/travel', function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    var journeys = []
    res.render('results', { journeys })
  }
})

router.post('/travel', async function (req, res, next) {
  var journeys = await journeyModel.find({
    departure: req.body.depart,
    arrival: req.body.arrivée,
    date: req.body.date,
  })
  res.render('results', { journeys })
})

<<<<<<< HEAD
router.get('/basket', async function(req, res, next){
  var tickets = await journeyModel.findById(req.query.id)
  res.render('basket', {tickets});
})
=======
router.get('/mytrips', function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    var lastTrip = [1]
    res.render('mytrips', { lastTrip })
  }
})

>>>>>>> 6d8f12da03543626040dd0571af43b60318b29d7
module.exports = router
