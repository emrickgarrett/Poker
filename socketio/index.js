const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('../models/mongoose/User');

module.exports = (io) => {

	io.on('connection', async function(socket) {
		console.log("A User Connected");

		socket.on('disconnect', function() {
			console.log("A User Disconnected");
		})
	});
}