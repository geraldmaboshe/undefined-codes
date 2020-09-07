Blog = {
	id: 'primary key',
	image: 'optional',
	title: 'required',
	date: 'date of publishing, required',
	author: 'authenticated user, required',
	article: 'unique, required, ',
	Comments: comment[{}],
};

Projects = {
	id: 'primary key',
	image: 'optional',
	title: 'required',
	date: 'date of publishing, required',
	author: 'authenticated user, required',
	article: 'unique, required, ',
};

Comments = {
	id: '',
	user_id: '',
	comment: '',
	blog_id: '',
};

Users = {
	id: 'required',
	email: 'required, unique',
	names: 'required',
	username: 'required',
	password: 'required',
	role: 'required enum',
	blog: Blog[{}],
};
