const router = require('express').Router();
const {
	getAllUsers,
	deleteBlog,
	deleteComment,
	deleteUser,
} = require('../../controllers/blog/admin');
const { protect, authorize } = require('../../middleware/auth.middleware');

router.route('/users').get(protect, authorize('admin'), getAllUsers);
router.delete('/user/:id', protect, authorize('admin'), deleteUser);
router.delete('/comment/:id', protect, authorize('admin'), deleteComment);
router.delete('/blog/:id', protect, authorize('admin'), deleteBlog);

module.exports = router;
