var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;
