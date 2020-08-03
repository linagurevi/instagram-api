const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Post = new mongoose.model('Post', {
	user: {
		type: ObjectId,
		required: true,
		ref: 'User'	
	},

	description: String,

	image: {
		type: String,
		required: true,
	},

	likes: [ObjectId],
	
	createdAt: {
		type: Date,
		default: () => new Date()
	}
});

module.exports = Post;
