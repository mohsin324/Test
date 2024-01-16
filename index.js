const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
// require
const NotFound = require('./api/middleware/NotFound');
const GlobalError = require('./api/middleware/ErrorHandler');
// router
const routes = require('./api/routes/route');
// using helmet for securing express app
app.use(helmet());
// parsin request body
app.use(express.urlencoded({
    limit: '10mb',
    extended: true
}));
app.use(express.json());
// cors for managing front-end request
app.use(cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}));

// routes
app.use(`/api/v1/`, routes);
// use static folder 
app.use('/UserProfilePictures', express.static('./UserProfilePictures'));

// middleware
app.use(NotFound);
app.use(GlobalError);

module.exports = app