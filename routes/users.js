var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var journeyModel = require('../models/journeys')


/* GET users listing. */
router.get('/sing-in', async function(req, res, next) {
  res.send('index');
});

router.get('/sign-up', async function(req, res, next){
  res.send('index')
})

module.exports = router;
