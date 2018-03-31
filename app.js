const path = require('path');
const express = require('express');
const app = express();

// set up static file middleware
app.use(express.static(path.join(__dirname, 'public')));

// set up views middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// connect to socket io

app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Now listening to port: ${port}`);
});