"use strict";

var socket = io();

var Chat = {
    init: function() {
        socket.on('connect', () => {
            console.log('Connected to WS');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WS');
        });
                
        socket.on('newUser', (data) => {
            this.appendMessage( data.sender, data.message);
        });
        
        socket.on('userJoinedRoom', (data) => {
            this.appendMessage( data.sender, data.message);
        });        

        this.chatFormEl = document.getElementById('chat-form');
        this.chatInputEl = document.getElementById('chat-input');
        this.chatMessages = document.getElementById('chat-messages');
        this.sendBtn = document.getElementsByClassName('sendBtn')[0];

        this.createMessage();
        this.listenForMessages();
    },

    appendMessage: function(sender = '', message = '') {
        var liEl = document.createElement('li');
        liEl.innerHTML = `${sender}: ${message}`;
        this.chatMessages.appendChild(liEl);
    },

    createMessage: function() {
        
        var self = this;

        this.chatFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            
            self.sendBtn.setAttribute('disabled', 'true');
            socket.emit('createMessage', {
                sender: 'User',
                message: self.chatInputEl.value
            }, function(status) {
                console.log('Sent.', status);

                self.sendBtn.removeAttribute('disabled');
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