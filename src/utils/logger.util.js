const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

const levels = {
    'error': 0,
    'warn': 1,
    'info': 2,
    'http': 3,
    'debug': 4
}

const colors={
    'error': 'red',
    'warn': 'yellow',
    'info': 'blue',
    'http': 'magenta',
    'debug': 'white'
}

winston.addColors(colors);

const level=()=>{
    const env = process.env.NODE_ENV || 'development';
    const isdev= (env ==='development');
    return isdev? 'debug':'warn';
}

const label_format= winston.format.label({
    label: path.basename(require.main.filename)
});

const ts_format = winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
})

const print_format= winston.format.printf((info)=>`${info.timestamp} - ${info.level} [${info.label}]:${info.message}`);

const format= winston.format.combine(label_format, ts_format, print_format);

const console_trport = new winston.transports.Console({
    format: winston.format.colorize({
        all: true
    })
});

const error_transport = new DailyRotateFile({
    filename: `./logs/error/error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'error'
});
const http_transport = new DailyRotateFile({
    filename: `./logs/access/access-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'http'
});

const info_transport = new DailyRotateFile({
    filename: `./logs/info/info-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'info'
});

const all_transport = new winston.transports.File({
    filename: './logs/all.log',
});

const transports = [console_trport, error_transport, http_transport, info_transport, all_transport];

const logger = winston.createLogger({
    level:level(),
    levels,
    format,
    transports
});

module.exports = logger;