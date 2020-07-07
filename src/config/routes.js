const express = require('express');
const users = require('../controllers/users');
const posts = require('../controllers/posts');
const auth = require('../middlewares/auth');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/posts')
	},
	filename: function (req, file, cb) {
        console.log(file.originalname);
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, file.fieldname + '-' + uniqueSuffix)
	}
})
const upload = multer({ storage: storage });
const routes = express.Router();

routes.get('/users', users.getAll);
routes.put('/users', users.create);
routes.post('/users/login', users.login);
routes.get('/users/me', auth, users.me);

routes.put('/posts', auth, posts.create);
// routes.put('/posts', upload.single('image'), posts.create);

routes.get('/health', (req, res) => {
    res.send('works!');
});

module.exports = routes;