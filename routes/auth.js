const router = require('express').Router();
const {
	register,
	login,
	getMe,
	forgotPassword,
	resetPassword,
} = require('../controllers/auth.controllers');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:resettoken', resetPassword);

module.exports = router;
