const pgp = require('pg-promise')();
const db = pgp('postgres://youngwoo@localhost:5432/underdogpool');
// const db = pgp(process.env.DATABASE_URL);

const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

var login = function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;

  db.one(
    "SELECT * FROM users WHERE email = $1", [email])
  .catch(function(){
    res.error = "Incorrect Email or Password";
    next();
  }).then(function(user){
    bcrypt.compare(
      password,
      user.password_digest,
      function(err, cmp){
        if(cmp){
          req.session.user = {
            'email': user.email,
            'id': user.users_id,
            'type': user.type
          };
          next();
        } else {
          res.error = "Incorrect Email or Password";
          next();
        }
      }
    );
  });
};

var logout = function(req, res, next){
  req.session.user = null;
  next()
};

var create_user = function(req, res, next){

  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.users_name;
  var type = req.body.type;
  var points = parseInt(req.body.points);

  bcrypt.hash(password, 10, function(err, hashed_password){
    db.none(
      "INSERT INTO users (users_name, email, password_digest, type, points) VALUES ($1, $2, $3, $4, $5)", [name, email, hashed_password, type, points])
    .catch(function(){
      res.error = 'Error. User could not be created.';
      next();
    }).then(function(user){
      req.session.user = {
        'email': email,
        'type': type
      };
      res.render('sessions/new');
    });
  });
};

module.exports = { login, logout, create_user };
