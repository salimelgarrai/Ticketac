var express = require('express')
var router = express.Router()

const mongoose = require('mongoose')
var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

/* GET users listing. */

router.post('/sign-in', async function (req, res, next) {
  var verif = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  })
  if (verif) {
    req.session.user = { name: verif.firstName, id: verif.id }
    req.session.tickets = []
    res.redirect('/home')
  } else {
    res.redirect('/')
  }
})

router.post('/sign-up', async function (req, res, next) {
  var verif = await userModel.findOne({ email: req.body.email })
  if (verif === null) {
    var newUser = new userModel({
      name: req.body.name,
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
    })
    var userSaved = await newUser.save()
    req.session.user = { name: userSaved.firstName, id: userSaved.id }
    req.session.tickets = []
    res.redirect('/home')
  } else {
    res.redirect('/')
  }
})

module.exports = router
