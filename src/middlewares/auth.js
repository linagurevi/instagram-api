const User = require('../models/user');
const { cookieName } = require('../config/env/index');

async function auth(req, res, next) {
    const userId = req.cookies[cookieName];
    if(!userId) {
        res.sendStatus(403);
        return;
    }
    const user = await User.findById(userId);
    if(!user) {
        res.sendStatus(403);
        return;
    }

    req.user = user;
    next();
}

module.exports = auth;

