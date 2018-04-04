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
            this.appendMessage( data.sender, data.message, data.time);
        });
        
        socket.on('userJoinedRoom', (data) => {
            this.appendMessage( data.sender, data.message, data.time);
        });        

        this.chatFormEl = document.getElementById('chat-form');
        this.chatInputEl = document.getElementById('chat-input');
        this.chatMessages = document.getElementById('chat-messages');
        this.sendBtn = document.getElementsByClassName('sendBtn')[0];

        this.createMessage();
        this.listenForMessages();
    },

    appendMessage: function(sender = '', message = '', time) {

        
        var d = new Date(time);

        var hours = d.getHours();
        var minutes = d.getMinutes();
        console.log(`${hours}:${minutes}`);
        

        var liEl = document.createElement('li');
        liEl.innerHTML = `${sender} ${hours}:${minutes} ${message}`;
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
                
                var timeSent = new Date().getTime();

                self.sendBtn.removeAttribute('disabled');
                self.appendMessage('User', self.chatInputEl.value, timeSent);
                self.chatInputEl.value = '';
            });            
        });
    },

    listenForMessages: function() {
        socket.on('newMessage', (data) => {            
            this.appendMessage(data.sender, data.message, data.time);
        });
    }
}

Chat.init();