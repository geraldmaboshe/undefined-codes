const ErrorResponse = require('../../utils/errorResponse');
const Blog = require('../../models/Blogs');
const asyncHandler = require('../../middleware/async');
const path = require('path');

// @desc     Upload photo
// @route    GET /api/v1/blogs/:userid
// @access   Publisher
exports.getUserBlogs = asyncHandler(async (req, res, next) => {
	let blogs = await Blog.find({ user: req.user.id }).populate('blog_comments');

	if (!blogs) {
		return next(new ErrorResponse(`No articles yet under this user`, 404));
	}

	res.status(200).json({ success: true, user: req.user.name, blogs });
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
	res.status(200).json({ success: true, blog: blog });
});

//@desc     Create blog
//@route    POST /api/v1/blogs/
//@access   Publisher
exports.createBlog = asyncHandler(async (req, res, next) => {
	//add user id and user name
	req.body.user = req.user.id;
	req.body.author = req.user.name;
	const blog = await (await Blog.create(req.body)).populate('user');

	res.status(200).json({ success: true, blog: blog });
});

//@desc     Update blog
//@route    PATCH /api/v1/blogs/:id
//@access   Publisher
exports.updateBlog = asyncHandler(async (req, res, next) => {
	const blogId = req.params.id;
	let blog = await Blog.findById(blogId, req.body, {
		new: true,
		runValidators: true,
	});

	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}

	if (blog.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`User ${req.user.id} is not authorized to edit this article`,
				401
			)
		);
	}

	blog = await Blog.findByIdAndUpdate(blogId);
	res.status(200).json({ success: true, blog: blog });
});

//@desc     Delete blog
//@route    DELETE /api/v1/blogs/:id
//@access   Publisher
exports.deleteBlog = asyncHandler(async (req, res, next) => {
	const blogId = req.params.id;
	let blog = await Blog.findById(blogId);

	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}

	if (blog.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`User ${req.user.id} is not authorized to delete this article`,
				401
			)
		);
	}

	blog = await Blog.findByIdAndDelete(blogId);

	res.status(200).json({ success: true, blog: blog });
});

//@desc     Upload photo
//@route    PUT /api/v1/blogs/:id/photo
//@access   Publisher
exports.blogPhotoUpload = asyncHandler(async (req, res, next) => {
	const blogId = req.params.id;
	let blog = await Blog.findById(blogId);

	if (!blog) {
		return next(
			new ErrorResponse(`Blog not found with the id of ${req.params.id}`, 404)
		);
	}

	if (blog.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(
				`User ${req.user.id} is not authorized to edit this article`,
				401
			)
		);
	}
	if (!req.files) {
		return next(new ErrorResponse('Please upload file', 400));
	}

	const file = req.files.file;

	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse('Please upload an image file', 400));
	}
	//check size
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(
			new ErrorResponse(
				`Please upload image less than ${
					process.env.MAX_FILE_UPLOAD / 1000000
				}MB, 400`
			)
		);
	}

	//create custom file name
	file.name = `photo_${blog._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			return next(new ErrorResponse(`${err}`, 500));
		}
		await Blog.findByIdAndUpdate(req.params.id, { image: file.name });
		res.status(200).json({ success: true, data: file.name });
	});
});
