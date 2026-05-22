import type { RequestHandler } from "express";
import { logger } from "../lib/logger";

export const requestLogger: RequestHandler = (req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    logger.info(
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        durationMs: Date.now() - startedAt,
      },
      `${req.method} ${req.originalUrl} ${res.statusCode}`
    );
  });

  next();
};
