const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const User = require('../../models/User');
const Blog = require('../../models/Blogs');
const Comment = require('../../models/Comment');

//@desc     Get all users
//@route    GET /api/v1/admin/users
//@access   Admin
exports.getAllUsers = asyncHandler(async (req, res, next) => {
	if (req.user.role !== 'admin') {
		return next(new ErrorResponse(`You have no root access`, 403));
	}
	const users = await User.find(req.query).populate('blogs');
	res.status(200).json({ success: true, total: users.length, data: users });
});

//@desc     Get all users
//@route    GET /api/v1/admin/users
//@access   Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
	const userId = req.params.id;
	if (req.user.role !== 'admin') {
		return next(new ErrorResponse(`You have no root access`, 403));
	}
	const users = await User.findByIdAndDelete(userId).populate('blogs');
	res.status(200).json({ success: true, data: users });
});

//@desc     Delete blog
//@route    DELETE /api/v1/admin/:id
//@access   Admin
exports.deleteBlog = asyncHandler(async (req, res, next) => {
	const blogId = req.params.id;
	if (req.user.role !== 'admin') {
		return next(new ErrorResponse(`You have no root access`, 403));
	}
	const blog = await User.findByIdAndDelete(blogId);
	res.status(200).json({ success: true, data: blog });
});

//@desc     Delete comment
//@route    DELETE /api/v1/admin/:id
//@access   Admin
exports.deleteComment = asyncHandler(async (req, res, next) => {
	const commentId = req.params.id;
	if (req.user.role !== 'admin') {
		return next(new ErrorResponse(`You have no root access`, 403));
	}
	const comment = await User.findByIdAndDelete(commentId);
	res.status(200).json({ success: true, data: comment });
});
