const logger = require('../helpers/logger');
const util = require('util');
const mongoose = require('mongoose');
const chalk = require('chalk');
// set mongoose Promise to Bluebird
mongoose.Promise = Promise;
const dbURI = process.env.MONGO_URI;
mongoose.set('useCreateIndex', true)
mongoose.connect(dbURI, { useNewUrlParser: true });

mongoose.connection.on("connected", function () {
    logger.info(chalk.green.bold(`Mongoose default connection open to ${dbURI}`));
})

mongoose.connection.on('error', function (err) {
    logger.info(chalk.red(`Mongoose default connection error: ${err}`));
});

mongoose.connection.on('disconnected', function () {
    logger.info(chalk.red('Mongoose Default Connection Disconnected'));
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        logger.info(chalk.red('Mongoose Default Connection Disconnected Through App Termination'));
        process.exit(0);
    });
});

// print mongoose logs in dev env
if (process.env.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        logger.debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

module.exports = mongoose;