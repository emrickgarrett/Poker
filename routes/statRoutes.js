const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('../models/mongoose/User');

module.exports = (app) => {

	app.get('/api/leaderboards', (req, res) => {
		User.find({}).select('username score').sort({score: -1}).limit(10).exec(function(err, users) {
			if(err) {
				res.status(500).send(err);
			} else {
				res.status(200).send(users);
			}
		})
	});
}