const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const hashMail = require('../utils/hash');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password, role } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		role,
	});

	sendTokenResponse(user, 200, res);
});

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorResponse('please provide an email and password', 400));
	}
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid login credentials', 401));
	}

	//check password
	const isPasswordMatch = await user.matchPassword(password);

	if (!isPasswordMatch) {
		return next(new ErrorResponse('Invalid login credentials', 401));
	}

	sendTokenResponse(user, 200, res);
});

//@desc     Register user
//@route    POST /api/v1/auth/register
//@access   Private
exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({ success: true, data: user });
});

//@desc     Reset forgot password
//@route    POST /api/v1/auth/forgotpassword
//@access   Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const email = req.body.email;
	const user = await User.findOne({ email: email });

	if (!user) {
		return next(new ErrorResponse('User does not exist', 404));
	}

	//
	const resetToken = user.getResetPassToken();

	await user.save({ validateBeforeSave: false });

	//reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/auth/resetpassword/${resetToken}`;
	const message = `Hi, you are receiving this email because you requested to reset your password. Click \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message,
		});

		res.status(200).json({ success: true, data: 'email sent' });
	} catch (err) {
		console.log(err);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}

	// res.status(200).json({ success: true, user: user });
});

//@desc     Reset password
//@route    PUT /api/v1/auth/resetpassword
//@access   Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken: resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	//set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
});

//get token, create cookie
const sendTokenResponse = (user, statusCdode, res) => {
	const token = user.getSignedJWToken();
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res
		.status(statusCdode)
		.cookie('token', token, options)
		.json({ success: true, token });
};
