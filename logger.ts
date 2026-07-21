import { createLogger, format, transports, Logger } from 'winston';

const isProd = process.env.NODE_ENV === 'production';

const logger: Logger = createLogger({
  level: isProd ? 'info' : 'debug',

  format: isProd
    ? format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    )
    : format.combine(
      format.timestamp({ format: 'DD-MM-YYYY hh:mm A' }),
      format.printf(({ level, message, timestamp, stack, ...meta }) => {
        let log = `${timestamp} : ${level}: ${stack || message}`;
        if (Object.keys(meta).length) {
          log += ` ${JSON.stringify(meta)}`;
        }

        return log;
      })
    ),

  transports: [
    new transports.File({ filename: 'logs/app.log' })
  ]
});

export default logger;