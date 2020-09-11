const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Project = require('../../models/Projects');

// @desc     delete user account
// @route    DELETE /api/v1/user/profile
// @access   user
exports.getProjects = asyncHandler(async (req, res, next) => {
	const projects = await Project.find();
	if (!projects) {
		return next(new ErrorResponse(`No projects found`, 404));
	}
	res
		.status(200)
		.json({ success: true, total: projects.length, data: projects });
	next();
});
