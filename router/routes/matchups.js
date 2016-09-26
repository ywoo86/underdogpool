const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
// const db = require('../../db/db');
const db2 = pgp('postgres://youngwoo@localhost:5432/underdogpool');

// const db2 = pgp(process.env.DATABASE_URL);

  router.get('/:week', function(req, res){
    var week = req.params.week;
    db2.any(
      'SELECT * FROM matchups m INNER JOIN teams t ON m.home_id = t.teams_id WHERE week = $1 ORDER BY m.matchups_id ASC', [week])
    .then(function(homeData){
      db2.any('SELECT * FROM matchups m INNER JOIN teams t ON m.away_id = t.teams_id WHERE week = $1 ORDER BY m.matchups_id ASC', [week])
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

  router.get('/edit', function (req, res) {
    var id = req.session.user.id;

    console.log(id);

    db2.any("SELECT * FROM picks WHERE picks_user_id = $1", [id])
    .then(function(pick1_data){
      console.log(pick1_data)
    });

    // db2.any("SELECT * FROM picks p INNER JOIN matchups m ON p.picks1_id = m.matchups_id WHERE p.picks_user_id = $1", [id])
    // .then(function(pick1_data){
    //   db2.any("SELECT * FROM picks p INNER JOIN matchups m ON p.picks2_id = m.matchups_id WHERE p.picks_user_id = $1", [id])
    //   .then(function(pick2_data){
    //     db2.any("SELECT * FROM picks p INNER JOIN matchups m ON p.picks3_id = m.matchups_id WHERE p.picks_user_id = $1", [id])
    //     .then(function(pick3_data){

    //       console.log('pick1: ', pick1_data);
    //       console.log('pick2: ', pick2_data);
    //       console.log('pick3: ', pick3_data);

    //       res.render('users/show', {pick1: pick1_data, pick2: pick2_data, pick3: pick3_data});
    //     })
    //   })
    // })
  })

module.exports = router;
