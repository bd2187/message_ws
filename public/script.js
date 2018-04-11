"use strict";

var socket = io();

var Chat = {
    init: function(username) {
        
        this.username = username;

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
        this.joinRoomContainer = document.getElementById('joinRoomContainer');
        this.joinRoomInput = document.getElementById('joinRoomInput');

        this.createMessage();
        this.listenForMessages();
        this.joinRoom();
    },

    appendMessage: function(sender = '', message = '', time) {

        
        var d = new Date(time);

        var hours = d.getHours();
        var minutes = d.getMinutes();
        
        var liEl = document.createElement('li');
        liEl.innerHTML = `${sender} ${hours}:${minutes} ${message}`;
        this.chatMessages.appendChild(liEl);
        
        liEl.scrollIntoView({ behavior: 'smooth' });

    },

    createMessage: function() {
        
        var self = this;

        this.chatFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            
            self.sendBtn.setAttribute('disabled', 'true');

            socket.emit('createMessage', {
                sender: self.username,
                message: self.chatInputEl.value
            }, function(status) {
                console.log('Sent.', status);
                
                var timeSent = new Date().getTime();

                self.sendBtn.removeAttribute('disabled');
                self.appendMessage(self.username, self.chatInputEl.value, timeSent);
                self.chatInputEl.value = '';
            });            
        });
    },

    listenForMessages: function() {
        socket.on('newMessage', (data) => {            
            this.appendMessage(data.sender, data.message, data.time);
        });
    },

    joinRoom: function() {
        
        var self = this;

        this.joinRoomContainer.addEventListener('submit', function(e) {

            e.preventDefault();

            const roomName = self.joinRoomInput.value;

            if (roomName.trim().length > 0) {                

                const userAndRoom = {
                    user: self.username,
                    room: roomName
                }

                socket.emit('join', userAndRoom, function(err) {
                    if (err) {
                        console.log(err);
                        return window.location.href = '/';
                    } else {
                        console.log('No errors');
                    }
                });
            }

        });
    }
}
