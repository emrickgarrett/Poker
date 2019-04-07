const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('../models/mongoose/User');
const authenticate = require('./middlewares/authenticate');

var usersOnline = [];

module.exports = (io) => {
	var chat = io.of('/chat');
	chat.use((socket, next) => authenticate(socket, next));

	chat.on('connection', function(socket) {
		if(!usersOnline.includes(socket.user.username)) {
			usersOnline.push(socket.user.username);
			console.log(`User: ${socket.user.username} has connected`);
			console.log(`Users Online: ${usersOnline}`);
			socket.emit("users_online", { usersOnline: usersOnline });
		}

		socket.on('message', message => {
			console.log(`Message From ${socket.user.username} : ${message.message}`);
			socket.broadcast.emit('chat', {author: socket.user.username, message: message});
		});

		socket.on('disconnect', function() {
			usersOnline = usersOnline.filter(function(item) {
				return item !== socket.user.username
			});
			console.log(`User: ${socket.user.username} has disconnected`);
			console.log(usersOnline);
			socket.emit("users_online", { usersOnline: usersOnline });
		});
	});

	

	chat.emit("message", "Welcome to Chat!");
}