const express = require('express');
const debuger = require('../../middleware/debug');
const router = express.Router();
const { getBlogs, getBlog } = require('../../controllers/blog/public');

router.route('/').get(debuger, getBlogs);
router.route('/:id').get(debuger, getBlog);

module.exports = router;
