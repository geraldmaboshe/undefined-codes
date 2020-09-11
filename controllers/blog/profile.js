const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const User = require('../../models/User');
const path = require('path');
const Blogs = require('../../models/Blogs');

// @desc     view user profile
// @route    GET /api/v1/user/profile
// @access   user
exports.viewProfile = asyncHandler(async (req, res, next) => {
	const {
		photo,
		name,
		email,
		about,
		github,
		facebook,
		linkedin,
		twitter,
	} = req.user;
	const pic = `${req.get('host')}/uploads/${photo}`;
	console.log(pic);

	res.status(200).json({
		success: true,
		data: {
			pic,
			name,
			email,
			about,
			github,
			facebook,
			linkedin,
			twitter,
		},
	});
});

// @desc     update user profile
// @route    PUT /api/v1/user/profile
// @access   user
exports.updateProfile = asyncHandler(async (req, res, next) => {
	const userId = req.user.id;
	const user = await User.findById(userId);
	if (req.user.id !== user.id) {
		return next(
			new ErrorResponse(
				`User ${req.user.id} is not authorized to edit this profile`,
				401
			)
		);
	}
	const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, updatedUser });
});

// @desc     upload profile picture
// @route    PATCH /api/v1/user/profile
// @access   user
exports.uploadProfilePicture = asyncHandler(async (req, res, next) => {
	const userId = req.user.id;

	let user = await User.findById(userId);

	if (!user) {
		return next(new ErrorResponse(`Server error`, 500));
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
					process.env.MAX_PROFILE_UPLOAD / 1000000
				}MB, 400`
			)
		);
	}

	//create custom file name
	file.name = `photo_${user._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.PROFILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			return next(new ErrorResponse(`${err}`, 500));
		}
		await User.findByIdAndUpdate(req.user.id, { photo: file.name });
		res.status(200).json({ success: true, data: file.name });
	});
});

// @desc     delete user account
// @route    DELETE /api/v1/user/profile
// @access   user
exports.deleteAccount = asyncHandler(async (req, res, next) => {
	const userId = req.user.id;
	let user = await User.findById(userId);
	if (userId !== user.id) {
		return next(new ErrorResponse(`Not authorized to edit this account`, 401));
	}
	user = await User.findByIdAndDelete(userId).populate('blog');
	res.status(200).json({ success: true, user });
});
