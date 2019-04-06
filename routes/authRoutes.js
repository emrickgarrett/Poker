const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('../models/mongoose/User');

module.exports = (app) => {

	app.get('/api/logout', (req, res) => {
		req.session = null;
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		if(req.session.userId) {
			User.findById(req.session.userId, '-password', function(err, user) {
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

	app.post('/api/create_user', (req, res) => {
		let username = req.body.username;
		let email = req.body.email;
		let password = req.body.password;
		let passwordConf = req.body.passwordConf;

		if(password === passwordConf) {
			User.create({username: username, email: email, password: password}, function(err, user) {
				if(err) {
					console.log(err);
					return res.status(500).send(err);
				} else {
					return res.status(200).send("Created");
				}
			})
		} else {
			res.status(400).send("Passwords Don't Match");
		}
	});

	app.post('/api/login', (req, res) => {
		let username = req.body.username;
		let password = req.body.password;

		if(username && password) {
			User.authenticate(username, password, function(error, user) {
				if(error || !user) {
					var err = new Error();
					err.message = "Wrong Email Or Password";
					err.status = 401;
					res.status(401).send(err);
					return;
				} else {
					req.session.userId = user._id;
					res.status(200).send(user);
					return;
				}
			});
		} else {
			var err = new Error();
			err.message = "All Fields Required"
			err.status = 400;
			res.status(400).send(err);
		}
	});
}