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




{
    "success": true,
    "total": 4,
    "comments": [
        {
            "username": "anonymous",
            "_id": "5f566bf38cc04ccfd7a5b4ba",
            "email": "moses@hotmail.com",
            "blog": "5f5660e07e2c84c975d2a31c",
            "comment": "very nice… i really like your",
            "__v": 0
        },
        {
            "username": "anonymous",
            "_id": "5f566bf88cc04ccfd7a5b4bb",
            "email": "m@hotmail.com",
            "blog": "5f5660e07e2c84c975d2a31c",
            "comment": "very nice… i really like your",
            "__v": 0
        },
        {
            "username": "anonymous",
            "_id": "5f566bff8cc04ccfd7a5b4bc",
            "email": "m@hotmail.com",
            "blog": "5f5660e07e2c84c975d2a31c",
            "comment": "nice",
            "__v": 0
        },
        {
            "username": "anonymous",
            "_id": "5f566c058cc04ccfd7a5b4bd",
            "email": "m@hotmail.com",
            "blog": "5f5660e07e2c84c975d2a31c",
            "comment": "good",
            "__v": 0
        }
    ]
}