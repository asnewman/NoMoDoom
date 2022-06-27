import winston from 'winston';
import LogzioWinstonTransport from 'winston-logzio';

const logzioWinstonTransport = new LogzioWinstonTransport({
  level: 'info',
  name: 'winston_logzio',
  token: process.env.LOGZIO_TOKEN || "",
  host: 'listener.logz.io',
});
const transports: winston.transport[] = [new winston.transports.Console()]
if (process.env.IS_LOCAL === "false") {
  transports.push(logzioWinstonTransport)
}
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports,
});

logger.log('info', 'Deployed hello!');

export default logger;