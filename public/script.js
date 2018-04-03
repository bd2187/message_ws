"use strict";

var socket = io();

socket.on('connect', () => {
    console.log('Connected to WS');
});

socket.on('newUser', (data) => {
    console.log(data);
});

socket.on('userJoinedRoom', (data) => {
    console.log(data);
});

socket.on('disconnect', () => {
    console.log('Unable to connect to WS');
});

socket.on('newMessage', (data) => {
    console.log(data);
});

socket.emit('createMessage', {
    sender: 'Brandon',
    message: 'What\'s up?'
}, function (status) {
    console.log('Sent.', status);
});