var express = require('express')
var router = express.Router()

var mongoose = require('mongoose')
var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login')
})

router.post('/sign-in', async function (req, res, next) {
  var verif = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  })
  if (verif) {
    req.session.user = { name: verif.firstName, id: verif.id }
    req.session.tickets = []
    req.session.travel = {}
    res.redirect('/home')
  } else {
    var user = await userModel.findOne({
      email: req.body.email,
    })
    if (user) {
      req.session.message = 'Le mot de passe est incorrect'
    } else {
      req.session.message = "L'utilisateur' n'existe pas"
    }
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
      role: 'users',
    })
    var userSaved = await newUser.save()
    req.session.user = { name: userSaved.firstName, id: userSaved.id }
    req.session.tickets = []
    req.session.travel = {}
    res.redirect('/home')
  } else {
    req.session.message = 'Un compte est déjà associé à cet email'
    res.redirect('/')
  }
})

router.get('/logout', async function (req, res, next) {
  req.session.user = undefined
  req.session.tickets = undefined
  req.session.travel = undefined
  req.session.message = 'Merci de votre visite'
  res.redirect('/')
})

module.exports = router
