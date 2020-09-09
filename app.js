const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 8000;
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv').config({ path: './config/config.env' });

//connect database
connectDB();

//Route files
const blogRoutes = require('./routes/blogs');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');

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

//mount routers
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1', commentRoutes);
app.use('/api/v1/auth', authRoutes);

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
