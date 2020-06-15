const express = require('express');
const users= require('../controllers/users')
const routes = express.Router();

routes.get('/users', users.getAll);
routes.put('/users', users.create);

routes.get('/health', (req, res) => {
    res.send('works!');
});

module.exports = routes;