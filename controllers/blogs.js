const ErrorResponse = require('../utils/errorResponse');
const Blog = require('../models/Blogs');
const asyncHandler = require('../middleware/async');

//@desc     Get all blogs
//@route    GET /api/v1/blogs
//@access   Public
exports.getBlogs = asyncHandler(async (req, res, next) => {
	const blogs = await Blog.find(req.query).populate('blog_comments');
	const total = blogs.length;
	res.status(200).json({ success: true, total: total, data: blogs });
});

//@desc     Get single blog
//@route    GET /api/v1/blogs/:id
//@access   Public
exports.getBlog = asyncHandler(async (req, res, next) => {
	const blogid = req.params.id;
	const blog = await Blog.findById(blogid).populate('blog_comments');
	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, msg: blog });
});

//@desc     Create blog
//@route    POST /api/v1/blogs/
//@access   Private
exports.createBlog = asyncHandler(async (req, res, next) => {
	//add user
	req.body.user = req.user.id;
	const blog = await Blog.create(req.body);

	res.status(200).json({ success: true, msg: blog });
});

//@desc     Update blog
//@route    PATCH /api/v1/blogs/:id
//@access   Private
exports.updateBlog = asyncHandler(async (req, res, next) => {
	const blogId = req.params.id;
	const blog = await Blog.findByIdAndUpdate(blogId, req.body, {
		new: true,
		runValidators: true,
	});

	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, msg: blog });
});

//@desc     Delete blog
//@route    DELETE /api/v1/blogs/:id
//@access   Private
exports.deleteBlog = asyncHandler(async (req, res, next) => {
	const blogId = req.params.id;
	const blog = await Blog.findByIdAndDelete(blogId);

	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({ success: true, mesg: blog });
});
