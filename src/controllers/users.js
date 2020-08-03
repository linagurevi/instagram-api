const md5 = require('md5');
const User = require('../models/user');
const Post = require('../models/post');
const config = require('../config/env/index');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const ERROR_DUPLICATE_VALUE = 11000;
const DURATION_60D = 60 * 60 * 24 * 60 * 1000;

class Users {

    async getAll(req, res) {

        const regex = new RegExp(req.query.username || '', 'i');
        try {
            const users =  await User
                .find({ username: regex })
                .select(['usename', 'avatar', 'bio'])
                .limit(10)
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async getUser(req, res) {
        try {
            const user = await User
            .findById(req.params.id)
            .select(['username', 'bio', 'avater', 'createdAt']);
            if(!user) {
                res.sendStatus(404);
                return;
            }
            res.json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    }
    
    async create(req, res) {
        const newUser = new User(req.body);
        newUser.password = md5(newUser.password);
        try {
            const createdUser = await newUser.save();
            res.status(201).json(createdUser);
        } catch(err) {
            if(err.code === ERROR_DUPLICATE_VALUE) {
                res.sendStatus(409);
                return;
            }
            res.status(400).json(err);
        }
    }

    async login (req, res) {
        const credentials = req.body;
        try {
            const user = await User.findOne({
                username: credentials.username,
                password: md5(credentials.password)
            });
            if(!user) {
                res.sendStatus(401);
                return;
            } 
            // success
            res.cookie(config.cookieName, user._id, { maxAge: DURATION_60D, httpOnly: true});
            res.json(user).send();
        } catch (err) {
           res.sendStatus(500);
       }
    }

    me(req, res) {
        res.json(req.user);
    }

    async getPosts(req, res) {
		try {
			const posts = await Post
				.find({
					user: req.params.id
                })
                .populate('user', ['avatar', 'username'])
				.sort({createdAt: req.query.sort || 1});
			res.json(posts);
		} catch(err) {
			res.sendStatus(400);
		}
    }

    async editProfile(req, res) {
        try {
            const filter = { _id: ObjectId(req.params.id) };
            const update = { avatar: req.file.filename, bio: req.body.bio };
            const user = await User.findOneAndUpdate(
              filter,
              update,
              {
                new: true,
              }, );
            res.status(200).json(user);
          } catch (error) {
            console.error(error);
            res.status(500).json(error);
          }
        }

}

module.exports = new Users();
