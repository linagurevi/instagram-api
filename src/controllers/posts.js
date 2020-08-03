const Post = require('../models/post');


class Posts {

	async create(req, res) {
		const post = new Post({
			user: req.user._id,
			image: req.file.filename,
			description: req.body.description
		});

		try {
			const createdPost = await post.save();
			res.status(201).json(createdPost);
		} catch(err) {
			res.status(400).json(err);
		}
	}

    async getAll(req, res) {
		try {
			const posts = await Post.find()
			.populate('user', ['avatar', 'username'])
				.sort({createdAt: req.query.sort});
			res.json(posts);
		} catch(err) {
			res.sendStatus(400);
		}
	}

	async like(req, res) {
		try {
			const post = await Post.findOneAndUpdate({
				_id: req.params.id
			}, {
				$addToSet: {
					likes: req.user._id
				}
			}, {
				new: true,
			});
			res.json(post);
		} catch(err) {
			res.status(500).json(err);
		}
	}

	async unlike(req, res) {
		if (req.user._id.toString() !== req.params.userId) {
			res.sendStatus(403);
			return;
		}
		try {
			const post = await Post.findOneAndUpdate({
				_id: req.params.id
			}, {
				$pull: {
					likes: req.user._id
				}
			}, {
				new: true
			});
			res.json(post);
		} catch(err) {
			res.status(500).json(err);
		}
	}

}

module.exports = new Posts();