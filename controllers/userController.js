const User = require('../models/userModel');

module.exports = function(app) {
    app.post('/user/signup/', (req, res) => {
        var newUser = new User({
            username: 'brandon',
            password: 'brandon'
        });
                
        newUser.save()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.json({err: err});
        });        
    });
}