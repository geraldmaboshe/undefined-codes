const bcrypt = require('bcryptjs');

//hash entered email
async function hashEnteredEmail(userEmail) {
	const salt = await bcrypt.genSalt(10);
	userEmail = await bcrypt.hash(userEmail, salt);
	return userEmail;
}

module.exports = hashEnteredEmail;
