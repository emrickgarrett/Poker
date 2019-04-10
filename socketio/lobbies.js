const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('../models/mongoose/User');
const Message = require('./models/messageProtocol');

module.exports = (io) => {

	var lobby = io.of('/gamelobby');
	lobby.use((socket, next) => authenticate(socket, next));

	lobby.on('connection', function(socket) {
		//TODO

		socket.on('disconnect', function() {

		});
	});

	

	lobby.emit("message", new Message("You have been connected!", 200));
}