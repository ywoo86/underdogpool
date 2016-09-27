const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = require('../../db/db');
// const db3 = pgp('postgres://youngwoo@localhost:5432/underdogpool');
const db3 = pgp(process.env.DATABASE_URL);

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
    "SELECT * FROM picks p JOIN matchups m ON p.game_picked_id=m.matchups_id JOIN teams t ON m.underdog=t.teams_id WHERE p.picks_user_id=$1", [req.session.user.id])
  .then(function(data){
    res.render('users/show', {picks: data});
  })
});

router.get('/destroy/:id', function (req, res) {
  var id = req.params.id;
  db3.none(
    "DELETE FROM picks WHERE id=$1", [id])
  .then(function(){
    res.redirect('/users/show');
  }).catch(function(){
    console.log('Error: Did not delete');
  })
})


module.exports = router;
