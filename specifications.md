#Undefined Blogs API Specifications

Create the backend for a personal blog and portfolio webiste. The frontend/UI will be created using react following the template available on colorlib. The template will be used as reference.

### Blogs

- List all blogs in the database
  - Pagination
  - Limit number of results
  - Search for Blog posts
  - Get Single Blog
  - Create new Blog
  - Authenticated users only
  - Must have the role of "admin" or "publisher"
  - Field validation
  - Upload photo for blog.
  - Photo will be uploaded to local filesystem
  - By owner of of blog
  - Update Blog
  - Admin or ownder of blog
  - Validation on update
  - Delete Blog
  - Admin or owner of blog only
  - Comment on blog
  - Authenticated users only

### Comments

- Delete comment
- Edit comments
- Create comment
- Get comments

### Projects

- List all projects
- Pagination
- filtering
- Get single project
- All users
- Add new project
- Admin only
- Update project
- Admin only
- Delete project
- Admin only

### Users & Authentication

- Authentication will be done using JWT/cookies
- JWT and cookie should expire in 30 days
- User registration
- Register as a "user" or "publisher"
- Once registered, a token will be sent along with a cookie (token = xxx)
- Passwords must be hashed
- User login
- User can login with email and password
- Plain text password will compare with stored hashed password
- Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
- Cookie will be sent to set token = none
- Get user
- Route to get the currently logged in user (via token)
- Password reset (lost password)
- User can request to reset password
- A hashed token will be emailed to the users registered email address
- A put request can be made to the generated url to reset password
- The token will expire after 10 minutes
- Update user info
- Authenticated user only
- Separate route to update password
- User CRUD
- Admin only
- Users can only be made admin by updating the database field manually

### Security

- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public (for now)

### Code Related Suggestions

- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Mongoose and no external libraries
- Use async/await (create middleware to clean up controller methods)
- Create a database seeder to import and destroy data

### Blog Routes

- GET ALL api/v1/undefined/blogs
- GET BY ID api/v1/undefined/blogs/{id}
- GET Search api/v1/undefined/{searchTerm}
- POST CREATE BLOG api/v1/undefined/
- PATCH UPDATE BLOG api/v1/undefined/blogs/{id}
- DELETE api/v1/undefined/blogs/{id}

### Portfolio Routes

- GET ALL api/v1/undefined/portfolio/
- GET ONE BY ID api/v1/undefined/portfolio/{id}
- POST ADD PROJECT api/v1/undefined/
- PATCH EDIT PROJECT api/v1/undefined/{id}
- DELETE PROJECT api/v1/undefined/{id}

### ROUTE STRUCTURE

- /api/v1/blogs
- /api/v1/Portfolio
- /api/v1/comments
- /api/v1/auth
- /api/v1/users

### Publisher Functionality

- Publisher can publish articles
- Publisher can delete his articles
- Publisher can update his article
- Publisher can view comments on his article
- Publisher can Can reply to comments
- Publisher can manage his profile

### Profile Management

- Upload profile picture
- Add github link
- Add facebook link
- Add LinkedIn Link
- Add twitter handle
- Change user name
- Delete account

### Functions on the API

<!-- - create user account or publisher account
- create article (publisher)
- post comment on article (all users)
- read articles (all users)
- delete article (publisher)
- edit article (publisher)
- Retrieve publisher articles (publisher)
- Filter articles (signed in user)
- Upload picture (signed in user)
- Upload profile picture (signed in user)
- Add github link (signed in user)
- Add facebook link (signed in user)
- Add LinkedIn Link (signed in user)
- Add twitter handle (signed in user)
- Change user name (signed in user)
- Delete account (signed in user) -->

- reply to article (all users)
<!-- - Post project (admin) -->
- edit project (admin)
- delete project (admin)
- list projects (all users)
- Contact admin (all users)
- Update CV (admin)
- see cv (all users)
- download cv (all users)
