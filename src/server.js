const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./config/routes');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

connect();

function listen() {
    app.listen(port, () => console.log(`Server listening on port ${port}!`));
}

function connect () {
    mongoose.connect('mongodb://localhost:27017/instagram', {
        userNerUrlParser: true,
        userUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', err => console.log(err));
    db.once('open', listen);
}