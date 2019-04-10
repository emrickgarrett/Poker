const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('./models/mongoose/User');

mongoose.connect(keys.mongoRoute);

app.use(bodyParser.json());
app.use(
	cookieSession({
		name: 'session',
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey] 
	})
);

//ROUTES
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require('./routes/statRoutes')(app);
require('./routes/infoRoutes')(app);

//SOCKETS
require('./socketio/index')(io);
require('./socketio/chat')(io);

//CRON JOBS
require('./services/cronJobs/currencyUpdater.js');

if(process.env.NODE_ENV === 'production') {

	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
server.listen(PORT);