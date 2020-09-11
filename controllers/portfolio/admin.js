const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Project = require('../../models/Projects');
const path = require('path');

// @desc     Create project
// @route    POST /api/v1/admin/portfolio/projects
// @access   admin
exports.createProject = asyncHandler(async (req, res, next) => {
	if (req.user.role !== 'admin') {
		return next(new ErrorResponse(`You have no permision`, 403));
	}

	if (!req.body.title || !req.body.description) {
		return next(new ErrorResponse(`Please add all required fields`, 400));
	}

	if (!req.files) {
		return next(new ErrorResponse('Please upload photo', 400));
	}

	const file = req.files.file;

	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse('Please upload an image file', 400));
	}
	//check size
	if (file.size > process.env.MAX_PROJECT_UPLOAD) {
		return next(
			new ErrorResponse(
				`Please upload image less than ${
					process.env.MAX_PROJECT_UPLOAD / 1000000
				}MB, 400`
			)
		);
	}

	//create custom file name
	file.name = `photo_${Date.now()}${path.parse(file.name).ext}`;

	file.mv(`${process.env.PROJECT_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			return next(new ErrorResponse(`${err}`, 500));
		}
		req.body.image = file.name;
		const project = await Project.create(req.body);
		res.status(200).json({ success: true, data: project });
	});
});

// @desc     Edit project
// @route    PUT /api/v1/admin/portfolio/projects/:id
// @access   admin
exports.editProject = asyncHandler(async (req, res, next) => {
	const projectId = req.params.id;
	if (!req.user.role !== 'admin') {
		return next(new ErrorResponse(`You have no permision`, 403));
	}

	let project = await Project.findById(id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!project) {
		return next(
			new ErrorResponse(`Project not found with id of ${req.params.id}`, 404)
		);
	}

	project = await Project.findByIdAndUpdate(blogId);
	res.status(200).json({ success: true, project });
});

// @desc     Update project image
// @route    PATCH /api/v1/admin/portfolio/:photo/projects
// @access   admin
exports.updateProjectImage = asyncHandler(async (req, res, next) => {
	const projectId = req.params.id;
	let project = await Project.findById(projectId);

	if (!project) {
		return next(
			new ErrorResponse(
				`project not found with the id of ${req.params.id}`,
				404
			)
		);
	}

	if (req.user.role !== 'admin') {
		return next(
			new ErrorResponse(`You have no permision to this resource`, 403)
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
	if (file.size > process.env.MAX_PROJECT_UPLOAD) {
		return next(
			new ErrorResponse(
				`Please upload image less than ${
					process.env.MAX_PROJECT_UPLOAD / 1000000
				}MB, 400`
			)
		);
	}

	//create custom file name
	file.name = `photo_${Date.now()}${path.parse(file.name).ext}`;

	file.mv(`${process.env.PROJECT_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			return next(new ErrorResponse(`${err}`, 500));
		}

		await Project.findByIdAndUpdate(req.params.id, { image: file.name });
		res.status(200).json({ success: true, data: file.name });
	});
});

//@desc     Delete project
//@route    DELETE /api/v1/admin/portfolio/projects/:id
//@access   Admin
exports.deleteProject = asyncHandler(async (req, res, next) => {
	const projectId = req.params.id;
	if (req.user.role !== 'admin') {
		return next(new ErrorResponse(`You have no root access`, 403));
	}
	const project = await Project.findByIdAndDelete(projectId);
	res.status(200).json({ success: true, data: project });
});
