const User = require('../models/userModel');
const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function(app) {

    app.get('/user/login', (req, res) => {
        res.render('login');
    });

    app.get('/user/signup', (req, res) => {
        res.render('signup');
    });

    app.post('/user/signup', (req, res) => {

        var { email, username, password, password2 } = req.body;

        if (!email || !username || !password || !password2) {
            console.log('All fields are required.');
            return res.render('signup', {
                email,
                username,
                message: 'All fields are required.'
            });
        }

        if (password !== password2) {
            console.log('Passwords do not match.');
            return res.render('signup', {
                email,
                username,
                message: 'Passwords do not match.'
            });
        }

        // Hash password
        bcrypt.genSalt(10, function(err, salt) {

            if (err) {
                console.log(err);
                return res.json({error: err});
            }

            bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    return res.json({error: err});
                }
    
                // Create new instance of user model
                var newUser = new User({
                    email,
                    username,
                    password: hash
                });
                
                // Save user to DB
                newUser.save()
                .then((user) => {
                    // log in user here
                    return res.json(user);
                })
                .catch((err) => {
                    return res.json({err: err});
                });    
            });
        });        
    });

    app.post('/user/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            console.log(user, info);
          if (err) {
              console.log(`Error: ${err}`);
              return next(err);
            }

          if (!user) {
              console.log('Either username or password is incorrect');

              return res.render('login', {
                  message: 'Either username or password is incorrect'
              });
            }

          req.login(user, function(err) {
            if (err) {
                console.log(`Error: ${err}`);
                return next(err);
            }
            
            return res.redirect('/');
          });
        })(req, res, next);
      });
}