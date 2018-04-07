const User = require('../models/userModel');
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

    app.post('/user/login/:username/:login', (req, res) => {

    });
}