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

var dotenv = require('dotenv');
// Create Express app
const app = express();

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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const authRouter = require('./routes/auth.router');
app.use("/api/auth", authRouter);


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