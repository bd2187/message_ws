module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index');
    });
    
    app.get('/login', (req, res) => {
        res.end('login');
    });
}
