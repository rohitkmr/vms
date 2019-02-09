var redis = require('redis');
const logger = require('../helpers/logger');
var redisClient = redis.createClient({
    host: process.env.REDISHOST,
    port: process.env.REDISPORT
});

//Event Handdlers
redisClient.on('connect', function () {
    logger.info(chalk.green.bold(`'Connected to Redis' ${process.env.REDISHOST}`));
});

redisClient.on('ready', function () {
    logger.info(chalk.green.bold('Redis is ready'));
});

redisClient.on('error', function (err) {
    logger.info(chalk.green.bold(`Error in Redis : ${err}`));
});

/* GET / products,orders, get /id products,orders */
function checkCachedData(req, res, next) {
    let key = "__expIress__" + req.originalUrl || req.url;

    redisClient.get(key, function (err, reply) {
        if (reply) {
            res.send(JSON.parse(reply));
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                redisClient.setex(key, 2 * 3600, JSON.stringify(body));
                res.sendResponse(body);
            }
            next();
        }
    });
}

module.exports = {
    checkCachedData
}