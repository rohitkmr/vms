const Redis = require('ioredis');
const logger = require('../helpers/logger');
const chalk = require('chalk');

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});


redisClient.on('error', function (err) {
    logger.info(chalk.red(`Redis connection error: ${err}`));
});

redisClient.on('connect', function () {
    logger.info(chalk.green.bold(`Redis running on ${process.env.REDIS_PORT}`));
});

redisClient.on('closed', function () {
    logger.info(chalk.red('Redis Connection Disconnected'));
});