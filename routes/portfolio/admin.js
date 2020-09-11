const router = require('express').Router();
const debuger = require('../../middleware/debug');

const {
	createProject,
	editProject,
	updateProjectImage,
	deleteProject,
} = require('../../controllers/portfolio/admin');
const { protect, authorize } = require('../../middleware/auth.middleware');

router
	.route('/projects')
	.post(debuger, protect, authorize('admin'), createProject);

router
	.route('/projects/:id')
	.delete(protect, authorize('admin'), deleteProject)
	.put(protect, authorize('admin'), editProject);
router.patch('/:id/photo', protect, authorize('admin'), updateProjectImage);

module.exports = router;
