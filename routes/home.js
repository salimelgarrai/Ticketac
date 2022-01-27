var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/travel', async function(req, res, next){
  var journeys = await journeyModel.find({
    daparture: req.body.depart,
    arrival: req.body.arrivée,
    date: req.body.date
  });
    res.render('results', {journeys})
});

module.exports = router;