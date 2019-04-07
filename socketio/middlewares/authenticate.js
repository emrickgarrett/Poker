const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('../../models/mongoose/User');

module.exports = (socket, next) => {
	let token = socket.handshake.query.auth_token;

	User.find({auth_token: token}, 'username', function(err, user) {
		if(err || !user || _.isEmpty(user)) {
			//socket error
			socket.emit('auth_error', 'Unrecognized Token');
			console.log("User Not Authenticated");
		} else {
			socket.user = user[0];
			next();
		}
	})
};