const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.get('/login', function(req, res){
  // var error = req.flash('error')[0];
  res.render('sessions/new');
});

router.post('/create', db.login, function(req, res){
  res.redirect('/');
});

router.get('/logout', db.logout, function(req, res){
  res.redirect('/');
});

module.exports = router;
