const mongoose = require('mongoose');
const { schema } = require('./Blogs');

const CommentSchema = new mongoose.Schema({
	blog: {
		type: mongoose.Schema.ObjectId,
		ref: 'Blog',
		required: true,
	},
	email: {
		type: String,
		match: [
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		],
		required: [
			true,
			'kindly include your email, it will not be displayed in the comment.',
		],
	},
	username: {
		type: String,
		maxlength: 30,
		require: [false, 'your comment will show as anonymous'],
		default: 'anonymous',
	},
	comment: {
		type: String,
		required: [true, 'Please type your comment'],
		trim: true,
	},
});

module.exports = mongoose.model('Comment', CommentSchema);
