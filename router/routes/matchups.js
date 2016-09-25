const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
// const db = require('../../db/db');
const db2 = pgp('postgres://youngwoo@localhost:5432/underdogpool');

// const db2 = pgp(process.env.DATABASE_URL);

  router.get('/:id', function(req, res){
    var id = req.params.id;
    db2.any(
      'SELECT * FROM matchups m INNER JOIN teams t ON m.home_id = t.teams_id WHERE week = $1 ORDER BY m.matchups_id ASC', [id])
    .then(function(homeData){
      db2.any('SELECT * FROM matchups m INNER JOIN teams t ON m.away_id = t.teams_id WHERE week = $1 ORDER BY m.matchups_id ASC', [id])
      .then(function(awayData){
        res.send({home: homeData, away: awayData});
      })
    })
  });

  router.post('/', function(req, res){
    var id = req.session.user.id;
    var pick1_id = req.body.pick1;
    var pick2_id = req.body.pick2;
    var pick3_id = req.body.pick3;
    db2.none(
      "INSERT INTO picks (picks_user_id, pick1_id, pick2_id, pick3_id) VALUES ($1, $2, $3, $4)", [id, pick1_id, pick2_id, pick3_id])
    .catch(function(){
      res.error = "Error: Picks not confirmed";
      next();
    }).then(function(){
      res.redirect('/')
    })
  });

module.exports = router;
