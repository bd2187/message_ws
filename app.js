const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Connect to Mongo DB
const mongoose = require('mongoose');
const database = require('./config/database');
mongoose.Promise = global.Promise;
mongoose.connect(database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => { console.log('connected to DB') });

// set up static file middleware
app.use(express.static(path.join(__dirname, 'public')));

// set up views middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up controllers
var chatController = require('./controllers/chatController')(app);
var userController = require('./controllers/userController')(app);

// Set up websocket
const websocket = require('./config/websocket');
io.on('connection', (socket) => { websocket(socket) });

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Now listening to ${port}`);
});
