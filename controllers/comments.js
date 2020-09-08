const Comment = require('../models/Comment');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { json } = require('express');

//@desc     Get Single comment
//@route    GET /api/v1/:blogsId/comments/commentid
//@access   Public
exports.getComment = asyncHandler(async (req, res, next) => {
	const commentId = req.params.commentId;
	const Ccmment = await Comment.findById(commentid);

	if (!Comment) {
		return next(new ErrorResponse('Comment not found', 404));
	}

	const total = comment.length;
	res.status(200).json({ success: true, total: total, comment: comment });

	next();
});

//@desc     Create comment
//@route    POST /api/v1/:blogsId/comments
//@access   Public
exports.createComment = asyncHandler(async (req, res, next) => {
	const data = req.body;
	const comment = await Comment.create(data);

	res.status(200).json({ success: true, comment: comment });
	next();
});

//@desc     Edit omment
//@route    PATCH /api/v1/:blogsId/comments
//@access   User
exports.editComment = asyncHandler(async (req, res, next) => {
	const commentId = req.params.commentid;
	const comment = Comment.findByIdAndUpdate(commentid, {
		new: true,
		runValidators: true,
	});

	if (!Comment) {
		return next(new ErrorResponse('Comment not found', 404));
	}
	res.status(200).json({ success: true, comment: comment });

	next();
});

//@desc     Delete comment
//@route    DELETE /api/v1/:blogsId/comments/commentId
//@access   Admin
exports.deleteComment = asyncHandler(async (req, res, next) => {
	const commentId = req.params.commentId;
	const deletedComment = Comment.findByIdAndDelete(commentid);

	if (!deletedComment) {
		return next(new ErrorResponse('Comment not found', 404));
	}

	res.status(200).json({ success: true, deletedComment: deletedComment });

	next();
});
