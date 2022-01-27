var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;