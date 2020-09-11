const ErrorResponse = require('../../utils/errorResponse');
const Blog = require('../../models/Blogs');
const asyncHandler = require('../../middleware/async');

//@desc     Get all blogs
//@route    GET /api/v1/blogs
//@access   Public
exports.getBlogs = asyncHandler(async (req, res, next) => {
	const blogs = await Blog.find(req.query).populate('blog_comments');
	const total = blogs.length;
	res.status(200).json({ success: true, total: total, blogs: blogs });
});

//@desc     Get single blog
//@route    GET /api/v1/blogs/:id
//@access   Public
exports.getBlog = asyncHandler(async (req, res, next) => {
	const blogid = req.params.id;
	let blog = await Blog.findById(blogid).populate('blog_comments');
	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}
	blog = await Blog.findByIdAndUpdate(blogid, { views: (blog.views += 1) });

	res.status(200).json({ success: true, blog: blog });
});
