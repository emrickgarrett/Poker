const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('../models/mongoose/User');
const authenticate = require('./middlewares/authenticate');

module.exports = (io) => {
	var chat = io.of('/chat');
	chat.use((socket, next) => authenticate(socket, next));

	chat.on('connection', function(socket) {
		socket.on('message', message => {
			console.log(`Got Message: ${message}`);
			socket.broadcast.emit('chat', message);
		});
	});

	

	chat.emit("message", "Welcome to Chat!");
}