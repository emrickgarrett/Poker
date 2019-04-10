const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('../models/mongoose/User');

module.exports = (app) => {

	app.get('/api/get_user', (req, res) => {
		if(req.userId) {
			User.findById(req.userId, '-password -auth_token', function(err, user) {
				if(err) {
					res.status(500).send(err);
					return;
				} else {
					res.status(200).send(user);
					return;
				}
			});
		} else {
			res.status(401).send("{ \"message\": \"No user found.\"}");
		}
	});

}