var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user === undefined){
    res.render('login')
  } else {
    res.render('index')
  };
});

router.post('/travel', async function(req, res, next){
  var journeys = await journeyModel.find({
    departure: req.body.depart,
    arrival: req.body.arrivée,
    date: req.body.date
  });
  console.log(journeys)
    res.render('results', {journeys})
});

module.exports = router;