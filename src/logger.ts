// src/logger.ts
import winston from 'winston';

// Define the log format
const logFormat = winston.format.combine(
	winston.format.timestamp(),
	winston.format.printf(({ timestamp, level, message }) => {
		return `${timestamp} [${level}]: ${message}`;
	}),
);

// Create a logger instance
const logger = winston.createLogger({
	level: 'info', // default logging level
	transports: [
		// Console log output
		new winston.transports.Console({
			format: logFormat,
		}),
		// Log to a file (optional for persistent logs)
		new winston.transports.File({
			filename: 'logs/app.log',
			format: logFormat,
		}),
	],
});

export default logger;
