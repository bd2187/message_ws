const path = require('path');
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

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
    
    socket.emit('newUser', {
        message: 'Welcome!'
    });

    socket.broadcast.emit('userJoinedRoom', {
        message: 'New User joined chat room'
    });

    socket.emit('newMessage', {
        from: 'brandon',
        message: 'how are you?'
    });

    socket.on('createMessage', (data) => {
        console.log(data);
        // sending to all clients except sender
        data.time = new Date().getTime();
        socket.broadcast.emit('newMessage', data);
    });

    socket.on('disconnect', (socket) => {
        console.log('User disconnected from app');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Now listening to ${port}`);
});
