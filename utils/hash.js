const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const hashMail = (mail) => {
	const hash = crypto.createHash('sha256').update(email).digest('hex');
	return hash;
};

//hash entered email
async function hashEnteredEmail(userEmail) {
	const salt = await bcrypt.genSalt(10);
	userEmail = await bcrypt.hash(userEmail, salt);
	return userEmail;
}

module.exports = hashMail;
