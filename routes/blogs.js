const express = require('express');
const router = express.Router();
const {
	getBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
} = require('../controllers/blogs');

const { protect, authorize } = require('../middleware/auth.middleware');

router
	.route('/')
	.get(getBlogs)
	.post(protect, authorize('publisher', 'admin'), createBlog);
router
	.route('/:id')
	.get(getBlog)
	.patch(protect, authorize('publisher', 'admin'), updateBlog)
	.delete(protect, authorize('publisher', 'admin'), deleteBlog);

module.exports = router;
