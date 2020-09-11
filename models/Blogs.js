const mongoose = require('mongoose');
const User = require('./User');

const BlogSchema = new mongoose.Schema(
	{
		author: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: [true, 'please add a title'],
			trim: true,
			maxlength: [150, 'Title cannot be more than 50 characters'],
		},
		article: {
			type: String,
			required: [true, 'You need to write an article'],
		},
		image: {
			type: String,
			default: 'no-photo.jpg',
		},
		date: {
			type: Date,
			default: Date.now,
		},
		views: {
			type: Number,
			default: 0,
		},
		comments: {
			type: mongoose.Schema.ObjectId,
			ref: 'Comment',
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: User,
			required: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

BlogSchema.virtual('blog_comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'blog',
	justOne: false,
});

module.exports = mongoose.model('Blog', BlogSchema);
