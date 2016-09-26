const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.get('/login', function(req, res){
  res.render('sessions/new');
});

router.post('/create', db.login, function(req, res){
  if (res.error){
    res.redirect('/users/new');
  } else {
    res.redirect('/');
  }
});

router.get('/logout', db.logout, function(req, res){
  res.redirect('/');
});

module.exports = router;
