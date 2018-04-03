"use strict";

var socket = io();

var Chat = {
    init: function() {
        socket.on('connect', () => {
            console.log('Connected to WS');
        });

        socket.on('disconnect', () => {
            console.log('Unable to connect to WS');
        });
                
        socket.on('newUser', (data) => {
            console.log(data);
        });
        
        socket.on('userJoinedRoom', (data) => {
            console.log(data);
        });        

        this.chatFormEl = document.getElementById('chat-form');
        this.chatInputEl = document.getElementById('chat-input');
        this.chatMessages = document.getElementById('chat-messages');

        this.createMessage();
        this.listenForMessages();
    },

    appendMessage: function(sender, message) {
        var liEl = document.createElement('li');
        liEl.innerHTML = `${sender}: ${message}`;
        this.chatMessages.appendChild(liEl);
    },

    createMessage: function() {
        
        var self = this;

        this.chatFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            
            socket.emit('createMessage', {
                sender: 'User',
                message: self.chatInputEl.value
            }, function(status) {
                console.log('Sent.', status);

                self.appendMessage('User', self.chatInputEl.value);
                self.chatInputEl.value = '';
            });            
        });
    },

    listenForMessages: function() {
        socket.on('newMessage', (data) => {
            this.appendMessage(data.sender, data.message);
        });
    }
}

Chat.init();