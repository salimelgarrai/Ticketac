var express = require('express')
var router = express.Router()

var mongoose = require('mongoose')
var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

const totalBasket = (session) => {
  let quantity = 0
  session.map((ticket) => {
    quantity += ticket.quantity
  })
  return quantity
}

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    console.log(req.session.tickets)

    var basketLength = totalBasket(req.session.tickets)

    res.render('index', { basketLength })
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
    var basketLength = totalBasket(req.session.tickets)

    res.render('results', { journeys, basketLength })
  }
})

router.post('/travel', async function (req, res, next) {
  var journeys = await journeyModel.find({
    departure: req.body.depart,
    arrival: req.body.arrivée,
    date: req.body.date,
  })

  req.session.travel = journeys
  var basketLength = totalBasket(req.session.tickets)

  res.render('results', { journeys, basketLength })
})

router.get('/basket', async function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    var ticket = await journeyModel.findById(req.query.id)

    if (ticket !== null) {
      ticket = { ...ticket }
      ticket = ticket._doc
      ticket.id = ticket._id
      var exists = req.session.tickets.filter(
        (oldTicket) => oldTicket._id == ticket._id
      )

      if (exists.length < 1) {
        ticket.quantity = 1
        req.session.tickets.push(ticket)
      } else {
        req.session.tickets.map((tick) => {
          if (tick._id === exists[0]._id) {
            tick.quantity += 1
          }
        })
      }
      res.redirect('/home/travel')
    } else {
      var basketLength = totalBasket(req.session.tickets)

      res.render('basket', { tickets: req.session.tickets, basketLength })
    }
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
    var basketLength = totalBasket(req.session.tickets)

    res.render('mytrips', { lastTrip, basketLength })
  }
})

router.get('/confirm', async function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    for (let lastTrip of req.session.tickets) {
      var trips = await userModel
        .findOne({ _id: req.session.user.id })
        .populate('lastTrip')

      // console.log(trips.lastTrip[0].id)

      trips = trips.lastTrip.filter((trip) => trip.id === lastTrip._id)

      console.log(trips)

      if (trips.length < 1) {
        await userModel.updateOne(
          { _id: req.session.user.id },
          {
            $push: {
              lastTrip: lastTrip._id,
            },
          }
        )
      }
    }
    req.session.tickets = []
    var basketLength = totalBasket(req.session.tickets)

    res.render('confirm', { basketLength })
  }
})

router.get('/delete', function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    var basketLength = totalBasket(req.session.tickets)

    req.session.tickets = req.session.tickets.filter(
      (tick) => tick.id !== req.query.id
    )

    res.redirect('/home/basket')
  }
})

router.post('/update', function (req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/')
  } else {
    var basketLength = totalBasket(req.session.tickets)

    req.session.tickets.map((tick) => {
      if (tick.id === req.body.id) {
        tick.quantity = parseInt(req.body.value)
      }
    })

    res.redirect('/home/basket')
  }
})

module.exports = router
