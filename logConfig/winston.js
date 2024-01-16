const { createLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

// create folder
const logDir = '../Test_Log'; 
if(!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}
// create daily rotate file
const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/Test_Log-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true
});

// create logger 
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:MM:SS'
        }),
        // format will be print here
        format.printf(info => `${info.timestamp} [${Math.random() * 100 }] ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.timestamp} ${info.message}`
                )
            )
        }),
        dailyRotateFileTransport
    ]

})


module.exports = logger