const winston = require('winston');

// Define the format for the logs
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the logger instance with file and console transports
const logger = winston.createLogger({
    level: 'error', // Set the level of logging to "error" by default
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
        // new winston.transports.Console() // Also log to console
    ]
});

module.exports = logger;
