const router = require('express').Router();
const debuger = require('../../middleware/debug');

const {
	getProjects,
	getProject,
} = require('../../controllers/portfolio/public');

router.get('/', getProjects);
router.get('/:id', getProject);

module.exports = router;
