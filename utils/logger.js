var winston = require('winston'),
    fs = require('fs'),
    wdrf = require('winston-daily-rotate-file');

winston.emitErrs = true;

var ts = () => (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();

const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: `${logDir}/all-logs.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            timestamp: ts
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            timestamp: ts,
            colorize: true
        }),
        new (wdrf)({
            filename: `${logDir}/-logs.log`,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            timestamp: ts
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};