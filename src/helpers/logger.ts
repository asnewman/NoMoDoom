import winston from 'winston';

const papertrail = new winston.transports.Http({
  host: 'logs.collector.solarwinds.com',
  path: '/v1/log',
  auth: { username: String('') as string, password: process.env.PAPERTRAIL_TOKEN },
  ssl: true,
});

const logger = process.env.IS_LOCAL === "true" ? console :  winston.createLogger({
  transports: [papertrail],
});

export default logger;