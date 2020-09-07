const router = require('express').Router();
const {
	getComments,
	createComment,
	editComment,
	deleteComment,
	getComment,
} = require('../controllers/comments');

router.route('/:blogId/comments').get(getComments).post(createComment);

router
	.route('/:blogId/comments:/commentId')
	.get(getComment)
	.patch(editComment)
	.delete(deleteComment);

module.exports = router;
