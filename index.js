const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/mongoose/User');
require('./models/mongoose/Survey');

console.log(keys.mongoRoute);
mongoose.connect(keys.mongoRoute);

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		name: 'session',
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey] 
	})
);

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require('./routes/surveyRoutes')(app);
require('./services/cronJobs/currencyUpdater.js');

if(process.env.NODE_ENV === 'production') {

	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);