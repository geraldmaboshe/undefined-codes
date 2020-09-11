const debuger = (req, res, next) => {
	console.log(`Request is reaching route ${req.get('host')}${req.originalUrl}`);
	next();
};

module.exports = debuger;
