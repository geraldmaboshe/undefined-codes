const router = require('express').Router();
const debuger = require('../../middleware/debug');
const { protect, authorize } = require('../../middleware/auth.middleware');
const {
	getUserBlogs,
	createBlog,
	updateBlog,
	deleteBlog,
	blogPhotoUpload,
	getBlog,
} = require('../../controllers/blog/user');

router
	.route('/')
	.get(protect, authorize('user', 'publisher', 'admin'), getUserBlogs)
	.post(protect, authorize('user', 'admin'), createBlog);
router
	.route('/:id')
	.get(protect, authorize('user', 'admin'), getBlog)
	.patch(protect, authorize('user', 'admin'), updateBlog)
	.delete(protect, authorize('user', 'admin'), deleteBlog);

router
	.route('/:id/photo')
	.patch(
		debuger,
		protect,
		authorize('user', 'publisher', 'admin'),
		blogPhotoUpload
	);

module.exports = router;

module.exports = router;
