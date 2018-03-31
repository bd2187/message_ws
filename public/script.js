"use strict";

var server = io();

server.on('connect', () => {
    console.log('Connected to WS');
});

server.on('disconnect', () => {
    console.log('Unable to connect to WS');
});

server.on('newMessage', (data) => {
    console.log(data);
});

server.emit('createMessage', {
    from: 'client',
    message: 'hello server'
});