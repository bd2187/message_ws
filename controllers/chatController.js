module.exports = function(app) {
    app.get('/', (req, res) => {
        
        if (!req.isAuthenticated()) {
            return res.redirect('/user/login');
        }

        try {
            var username = res.locals.USER.username;
        } catch (e) {
            var username = 'randomUser';
        }

        res.render('index', { username });
    });
}
