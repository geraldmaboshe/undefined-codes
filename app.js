const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const dotenv = require('dotenv').config({ path: './config/config.env' });
const path = require('path');

//connect database
connectDB();

//Route files
const publicRoutes = require('./routes/blog/public');
const commentRoutes = require('./routes/blog/comments');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/blog/user');
const profileRoutes = require('./routes/blog/profile');
const adminBlogRoutes = require('./routes/blog/admin');
const adminPortfolioRoutes = require('./routes/portfolio/admin');
const publicPortfolioRoutes = require('./routes/portfolio/public');

//body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

var corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

//file upload
app.use(fileupload());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//mount routers
app.use('/api/v1/blog', publicRoutes);
app.use('/api/v1', commentRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user/blog', userRoutes);
app.use('/api/v1/user/profile', profileRoutes);
app.use('/api/v1/admin/', adminBlogRoutes);
app.use('/api/v1/admin/portfolio', adminPortfolioRoutes);
app.use('/api/v1/portfolio/projects', publicPortfolioRoutes);

//error handling middleware
app.use(errorHandler);

//Spin server
const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} ON PORT ${PORT}`)
);

//handle unhandled rejections
process.on('unhandledRejection', (err, Promise) => {
	console.log(`Error: ${err.message}`);
	server.close(() => process.exit(1));
});
