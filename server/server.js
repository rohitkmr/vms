const express = require('express');
const passport = require('passport');
const httpLogger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const helmet = require('helmet');
const logger = require('./helpers/logger');
const chalk = require('chalk');
var socketio = require('socket.io');
var io = socketio();
var dotenv = require('dotenv');
// Create Express app
const app = express();
const routes = express.Router();
app.io = io;
// Load environment variables from .env file
dotenv.load();
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
var PORT = process.env.PORT || 4000;
// Connect to MongoDB
const db = require('./libs/db');
// parse body params and attache them to req.body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// gzip compression
app.use(compression());
// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());
app.use(expressValidator());
app.use(cookieParser());

//const rateLimit = require('./middleware/ratelimit').limiter;

if (process.env.NODE_ENV === 'development') {
    app.use(httpLogger('dev'));
}

// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());
// enable authentication
app.use(passport.initialize());
app.use('/apidoc', express.static('docs'));

// file uploads is public static , with the /uploads path , it knows which paths it runs
app.use('/uploads', express.static('uploads'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Apply ratelimiter
//Prevents Bruteforces from the same IP
//app.use(rateLimit);

// pass the authorization checker middleware
//const authCheckMiddleware = require('./middleware/authCheck');
//app.get('/api', authCheckMiddleware);

//const authRouter = require('./routes/auth.router');
//app.use("/api/auth", authRouter);
// Add all the routes inside the routes folder
require('./routes')(routes);
// apply the routes to our application with the prefix /api
app.use('/api', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => res.status(httpStatus.NOT_FOUND).json({
    error: 'API not found'
})); // eslint-disable-line no-unused-vars

app.listen(PORT, function (error) {
    if (error) {
        logger.info(chalk.red("Server Can't Run: " + error));
    } else {
        logger.info(chalk.green.bold(`IZN API Server listen on port: ${PORT}`));
    }
});

module.exports = app;