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

    appendMessage: function(message) {
        var liEl = document.createElement('li');
        var textNode = document.createTextNode(message);

        liEl.appendChild(textNode);
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
                console.log('Send.', status);

                self.appendMessage(self.chatInputEl.value);
                self.chatInputEl.value = '';
            });            
        });
    },

    listenForMessages: function() {

        var self = this;
        socket.on('newMessage', (data) => {
            this.appendMessage(data.message);
        });
    }
}

Chat.init();