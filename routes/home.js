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
    var journeys = req.session.travel

    journeys.map((journey) => {
      journey.id = journey._id
    })

    res.render('results', { journeys })
  }
})

router.post('/travel', async function (req, res, next) {
  var journeys = await journeyModel.find({
    departure: req.body.depart,
    arrival: req.body.arrivée,
    date: req.body.date,
  })

  req.session.travel = journeys

  res.render('results', { journeys })
})

router.get('/basket', async function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    var ticket = await journeyModel.findById(req.query.id)
    if (ticket !== null) {
      var exists = req.session.tickets.filter(
        (oldTicket) => oldTicket._id == ticket.id
      )

      if (exists.length < 1) {
        req.session.tickets.push(ticket)
      }
    }
    res.render('basket', { tickets: req.session.tickets })
  }
})

router.get('/mytrips', async function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    var user = await userModel
      .findById(req.session.user.id)
      .populate('lastTrip')

    var lastTrip = user.lastTrip
    console.log(lastTrip)
    res.render('mytrips', { lastTrip })
  }
})

router.get('/confirm', async function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    console.log(req.session.user.id)
    for (const lastTrip of req.session.tickets) {
      console.log(lastTrip._id)
      await userModel.updateOne(
        { _id: req.session.user.id },
        {
          $push: {
            lastTrip: lastTrip._id,
          },
        }
      )
    }

    res.render('confirm')
    req.session.tickets = undefined
  }
})

module.exports = router
