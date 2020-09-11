const router = require('express').Router();
const {
	getComments,
	createComment,
	editComment,
	deleteComment,
	getComment,
} = require('../../controllers/blog/comments');

const { protect, authorize } = require('../../middleware/auth.middleware');

router.post('/:blogId/comments', createComment);

router
	.route('/:blogId/comments:/commentId')
	.get(getComment)
	// .patch(editComment)
	.delete(protect, authorize('admin'), deleteComment);

module.exports = router;
