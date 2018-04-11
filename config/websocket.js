const generateMessage = require('../utils/messaging.js');

module.exports = function(socket) {
    console.log('User connected to app'); 
    
    // Greets individual user
    socket.emit('newUser', generateMessage('Admin', 'Welcome'));

    // Broadcast call
    socket.broadcast.emit('userJoinedRoom', generateMessage('Session', 'New User joined chat room'));

    socket.on('createMessage', (data, callbackFn) => {
        socket.broadcast.emit('newMessage', generateMessage(data.sender, data.message));
        callbackFn('Success from server.');
    });

    // Join Room
    socket.on('join', (userAndRoom, callbackFn) => {
        console.log(userAndRoom);
        callbackFn();
    });

    socket.on('disconnect', (socket) => {
        console.log('User disconnected from app');
    });    
}