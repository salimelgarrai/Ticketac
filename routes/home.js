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

router.get('/confirm', async function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else { 
    for(var i=0;i<req.session.tickets;i++){
      await userModel.updateOne({_id: req.session.user.id}, 
        {$push: {lastTrip: {
          date: req.session.tickets[i].date,
          journey: `${req.session.tickets[i].departure} / ${req.session.tickets[i].arrival}`,
          departureTime: req.session.tickets[i].departureTime,
          price: req.session.tickets[i].price
        }}})
        console.log(req.session.user.id)
    }
  }
})

module.exports = router
