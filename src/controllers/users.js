const User = require('../models/user')

class Users {

    getAll(req, res) {
        User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
    }

    create(req, res) {
        const newUser = new User(req.body);
        newUser.save()
                .then(user => {res.status(201).json(user)})
                .catch(err => res.status(400).json(err));
    }
    

}

module.exports = new Users();