const generateMessage = require('../utils/messaging.js');

module.exports = function(socket) {
    console.log('User connected to app'); 
    
    // socket.on('createMessage', (data, callbackFn) => {
    //     socket.broadcast.emit('newMessage', generateMessage(data.sender, data.message));
    //     callbackFn('Success from server.');
    // });

    // Join Room
    socket.on('join', (userAndRoom, callbackFn) => {

        const { user, room } = userAndRoom;
        
        socket.join(room);

        // Greets individual user
        socket.emit('newUser', generateMessage('Admin', `Welcome, you're now in ${room}`));

        // Broadcast call to specified room
        socket.broadcast.to(room).emit('userJoinedRoom', generateMessage('Session', `${user} joined ${room}.`));        

        
        socket.on('createMessage', (data, callbackFn) => {
            socket.broadcast.to(room).emit('newMessage', generateMessage(data.sender, data.message));
            callbackFn('Success from server.');
        });
        
        callbackFn();
    });

    socket.on('disconnect', (socket) => {
        console.log('User disconnected from app');
    });    

}