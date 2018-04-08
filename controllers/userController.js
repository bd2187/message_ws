const User = require('../models/userModel');
const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function(app) {
    app.post('/user/signup/:username/:password', (req, res) => {
                    
        // Hash password
        bcrypt.genSalt(10, function(err, salt) {

            if (err) {
                console.log(err);
                res.json({error: err});
            }

            bcrypt.hash(req.params.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    res.json({error: err});
                }
    
                // Create new instance of user model
                var newUser = new User({
                    username: req.params.username,
                    password: hash
                });
                
                // Save user to DB
                newUser.save()
                .then((user) => {
                    res.json(user);
                })
                .catch((err) => {
                    res.json({err: err});
                });    
            });
        });        
    });

    app.get('/user/login', (req, res) => {
        res.render('login');
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