const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Project = require('../../models/Projects');

// @desc     Get all projects
// @route    GET /api/v1/portfolio/projects
// @access   public
exports.getProjects = asyncHandler(async (req, res, next) => {
	const projects = await Project.find();
	if (!projects) {
		return next(new ErrorResponse(`No projects found`, 404));
	}
	res
		.status(200)
		.json({ success: true, total: projects.length, data: projects });
});

// @desc     Get all project
// @route    GET /api/v1/portfolio/projects/:project
// @access   public
exports.getProject = asyncHandler(async (req, res, next) => {
	const projectId = req.params.id;
	const project = await Project.findById(projectId);
	if (!project) {
		return next(
			new ErrorResponse(`No project with id ${projectId} found`, 404)
		);
	}
	res.status(200).json({ success: true, data: project });
});
