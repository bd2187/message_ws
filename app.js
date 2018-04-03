const path = require('path');
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const generateMessage = require('./utils/messaging.js');

// set up static file middleware
app.use(express.static(path.join(__dirname, 'public')));

// set up views middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('User connected to app'); 
    
    // Greets individual user
    socket.emit('newUser', generateMessage('Admin', 'Welcome'));

    // Broadcast call
    socket.broadcast.emit('userJoinedRoom', generateMessage('Session', 'New User joined chat room'));

    socket.on('createMessage', (data, callbackFn) => {
        socket.emit('newMessage', generateMessage(data.sender, data.message));
        callbackFn('Success from server.');
    });

    socket.on('disconnect', (socket) => {
        console.log('User disconnected from app');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Now listening to ${port}`);
});
