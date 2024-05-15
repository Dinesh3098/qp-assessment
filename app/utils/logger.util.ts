import { NextFunction, Request, Response } from "express";
import { url } from "inspector";
import { createLogger, transports, format, Logger } from "winston";

const logger: Logger = createLogger({
  level: "info",
  format: format.combine(
    format.errors({ stack: true }),
    format.splat(),
    format.metadata(),
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.printf((logData) => {
        const { timestamp, level, message, ...metadata } = logData;
        return JSON.stringify({ level, timestamp, ...metadata, message });
      }),
    }),
  ],
});

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const requestDetails = {
    method: req.method,
    url: req.headers.host,
    path: req.path,
  };

  logger.info("request logged", { Request: requestDetails });

  next();
};

export { logger, logRequest };
