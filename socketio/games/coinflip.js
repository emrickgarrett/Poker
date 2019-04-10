const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('../models/mongoose/User');
const authenticate = require('./middlewares/authenticate');

// flip: Send a flip result to the server
// result: The result of a flip (See if I can return to a message)
// disconnect: End the lobby?

module.exports = (io) => {
	var coinflip = io.of('/coinflip');
	coinflip.use((socket, next) => authenticate(socket, next));

	coinflip.on('connection', function(socket) {
		if(!usersOnline.includes(socket.user.username)) {
			usersOnline.push(socket.user.username);
			console.log(`User: ${socket.user.username} has connected`);
			socket.emit("users_online", { usersOnline: usersOnline });
		}

		socket.on('flip', message => {
			console.log(`CoinFlip From ${socket.user.username} : ${message.message}`);
			//prob will want to do some validation
			if(message.message === '') {
				return;
            }
            
            //Need to change this to a coin flip method
			socket.broadcast.emit('result', message);
		});

		socket.on('disconnect', function() {
            console.log(`User: ${socket.user.username} has disconnected`);
            
            //End the game
		});
	});

	

	chat.emit("message", "Welcome to Coin Flip!");
}