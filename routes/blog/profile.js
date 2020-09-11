const router = require('express').Router();
const { protect } = require('../../middleware/auth.middleware');
const {
	viewProfile,
	updateProfile,
	uploadProfilePicture,
	deleteAccount,
} = require('../../controllers/blog/profile');

router
	.route('/')
	.get(protect, viewProfile)
	.put(protect, updateProfile)
	.patch(protect, uploadProfilePicture)
	.delete(protect, deleteAccount);

module.exports = router;
