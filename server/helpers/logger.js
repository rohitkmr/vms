let winston = require('winston')
const fs = require('fs')
const logDir = 'logs'
const env = process.env.NODE_ENV || 'development'

let logger;
if (env === 'development') {
    if (!fs.existsSync(logDir)) {
        // Create the directory if it does not exist
        fs.mkdirSync(logDir)
    }
    logger = new (winston.Logger)({
        transports: [
            new winston.transports.Console({
                level: 'debug', // Only write logs of warn level or higher
                colorize: true
            }),
            new winston.transports.File({
                level: env === 'development' ? 'debug' : 'info',
                filename: logDir + '/logs.log',
                maxsize: 1024 * 1024 * 10 // 10MB
            })
        ],
        exceptionHandlers: [
            new winston.transports.Console({
                level: 'debug', // Only write logs of warn level or higher
                colorize: true
            }),
            new winston.transports.File({
                filename: 'logs/exceptions.log'
            })
        ]
    })
} else {
    logger = new (winston.Logger)({
        transports: [
            new winston.transports.Console({
                level: 'debug', // Only write logs of warn level or higher
                colorize: true
            })
        ],
        exceptionHandlers: [
            new winston.transports.Console({
                level: 'debug', // Only write logs of warn level or higher
                colorize: true
            })
        ]
    })
}
module.exports = logger