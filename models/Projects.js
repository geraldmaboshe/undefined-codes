const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	image: {
		type: String,
		required: [true, 'add photo'],
	},
	title: {
		type: String,
		required: [true, 'Add a title for your project'],
		maxlength: 50,
	},
	description: {
		type: String,
		required: [true, 'Whats the project about?'],
		maxlength: 500,
		min: 50,
	},
	link: String,
	repo: String,
	technologies: {
		type: String,
		required: [String],
	},
});

module.exports = mongoose.model('Projects', projectSchema);
