const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
	{
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
		views: Number,
		comments: {
			type: mongoose.Schema.ObjectId,
			ref: 'Comment',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

BlogSchema.virtual('comment', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'blog',
	justOne: false,
});

module.exports = mongoose.model('Blog', BlogSchema);
