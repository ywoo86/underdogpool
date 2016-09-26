const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = require('../../db/db');
const db3 = pgp('postgres://youngwoo@localhost:5432/underdogpool');

router.get('/new', function (req, res) {
  res.render('users/new');
});

router.post('/create', db.create_user, function (req, res) {
  if(res.error){
    res.render('users/new', {error: res.error});
  } else {
    res.redirect('/');
  }
});

router.get('/show', function (req, res) {
  db3.any(
    "SELECT * FROM picks WHERE picks_user_id=$1", [req.session.user.id])
  .then(function(data){
    console.log(data);
    res.render('users/show', data);
  })
});


module.exports = router;
