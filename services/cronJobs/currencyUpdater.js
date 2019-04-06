const cron = require("node-cron");
const _ = require('lodash');
const keys = require('../../config/keys');

const mongoose = require('mongoose');
const User = mongoose.model('users');

cron.schedule("30 7 * * * *", async function() {
	const poorbois = await User.find({
									credits: { $lt: 1000 }
								}).select();

	poorbois.forEach(function(element) {
		giveMonehPlz(element);
	});
});

function giveMonehPlz({ _id }) {
	console.log(_id);
	User.updateOne({
					_id: _id,
				}, {
					$set: { 'credits' : 1000}
				}).exec();
}