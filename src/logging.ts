import winston from "winston";
const { combine, timestamp, simple, colorize, json } = winston.format;

const devFormat = combine(
  colorize(),
  timestamp(),
  simple(),
);

const prodFormat = combine(
  timestamp(),
  json()
);

const env = new Map(Object.entries(process.env));
const isDev = process.env.NODE_ENV === 'dev';


export const logger = winston.createLogger({
  defaultMeta: {
    INSTANCE_NUMBER: env.get('INSTANCE_NUMBER') ?? '0',
    service: 'bare'
  },
  transports: [
    new winston.transports.Console({
      format: process.env.NODE_ENV === 'dev' ? devFormat : prodFormat,
      level: isDev ? 'silly' : 'info',
      handleExceptions: false,
    })
  ],
})