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

router.get('/basket', async function (req, res, next) {
  var ticket = await journeyModel.findById(req.query.id)
  req.session.tickets.push(ticket)
  console.log(req.session.tickets)
  res.render('basket', { tickets: req.session.tickets })
})

router.get('/mytrips', function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    var lastTrip = [1]
    res.render('mytrips', { lastTrip })
  }
})


module.exports = router
