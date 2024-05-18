import { NextFunction, Request, Response } from "express";
import { url } from "inspector";
import { createLogger, transports, format, Logger } from "winston";
import { MiddlewareFunction } from "../middlewares/middleware";

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
        if (Object.keys(metadata.metadata).length>0)
          return JSON.stringify({ level, timestamp, ...metadata, message });
        else return JSON.stringify({ level, timestamp, message });
      }),
    }),
  ],
});

const logRequest: MiddlewareFunction = (req, res, next) => {
  const requestDetails = {
    method: req.method,
    url: req.headers.host,
    path: req.path,
    body: req?.body,
  };

  logger.info("request logged", { Request: requestDetails });

  next();
};

export { logger, logRequest };
