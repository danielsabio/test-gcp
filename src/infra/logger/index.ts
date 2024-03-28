import { LoggingWinston } from '@google-cloud/logging-winston';
import winston from 'winston';

import { config } from '../config';

export const Logger = winston.createLogger({
  silent: config.NODE_ENV === 'test',
  level: config.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  transports: [new winston.transports.Console(), ...(config.NODE_ENV !== 'development' ? [new LoggingWinston()] : [])],
});
