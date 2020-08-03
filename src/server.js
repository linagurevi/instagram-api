const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./config/routes');
const config = require('./config/env/index');
const app = express();
const port = 4000;

app.use(cors({
	origin: true,
	credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(routes);

connect();

function listen() {
	app.listen(port, () => {
		return console.log(`Server listening on port ${port}!`);
	});
}

function connect() {
	mongoose.connect(config.dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});
	const db = mongoose.connection;
	db.on('error', err => console.log(err));
	db.once('open', listen);
}
