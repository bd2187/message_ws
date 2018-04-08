const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');


module.exports = function(passport) {

    passport.use(new LocalStrategy(
        function(username, password, done) {
        
            User.findOne({ username }, function (err, user) {
                
                if (err) {
                    console.log(err);
                    return done(err);
                }

                if (!user) {
                    console.log('Incorrect username');
                    return done(null, false, { message: 'Incorrect username.' });
                }

                bcrypt.compare(password, user.password, function(err, res) {
                    if (!res) {
                        console.log('Incorrect password');
                        return done(null, false, { message: 'Incorrect password.' });
                    } else {
                        console.log('Success, user logged in');
                        return done(null, user);
                    }
                });
            });                
            
        }
      ));

      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });      
}
