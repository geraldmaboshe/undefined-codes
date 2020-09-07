const express = require('express');
const router = express.Router();
const {
	getBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
} = require('../controllers/blogs');

router.route('/').get(getBlogs).post(createBlog);
router.route('/:id').get(getBlog).patch(updateBlog).delete(deleteBlog);

module.exports = router;
