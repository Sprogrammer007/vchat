"use strict";
var express = require('express')
  , router = express.Router()
  , moment = require('moment')
  , User = require('../models/user');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vulcun Chat'});
});

/* GET  query. */
router.get('/query', function(req, res, next) {
  res.render('query', { title: 'Vulcun Chat'});
});

router.post('/query', function(req, res, next) {
  if (!req.body.full_name) { return res.json({error: 1})}
  let startTime = moment(); 
  User.like('full_name', req.body.full_name).then(function(users) {
    let endTime = moment();
    res.json({time: (endTime.diff(startTime)), users: users});
  })
});

router.get('/chat', function(req, res, next) {
  res.render('chat', {title: 'Vulcun Chat'});
});


module.exports = router;