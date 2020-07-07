const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const Post = new mongoose.model('Post', {
    userId: {
        type: ObjectId,
        required: true
    },

    iamge: {
        type: String,
        required: true
    },

    description: String,

    likes: [ObjectId],
    
    createdAt: {
        type: Date,
        defualt: () => new Date()
    }
});

module.exports = Post;