import type { RequestHandler } from "express";
import { logger } from "../lib/logger";

const SENSITIVE_QUERY_KEYS = new Set(["contato"]);

const redactSensitiveQuery = (url: string): string => {
  const queryStart = url.indexOf("?");
  if (queryStart === -1) return url;

  const path = url.slice(0, queryStart);
  const query = url.slice(queryStart + 1);

  const redacted = query
    .split("&")
    .map((pair) => {
      const [rawKey, ...rest] = pair.split("=");
      if (!rawKey) return pair;
      const key = decodeURIComponent(rawKey);
      if (SENSITIVE_QUERY_KEYS.has(key) && rest.length > 0) {
        return `${rawKey}=[REDACTED]`;
      }
      return pair;
    })
    .join("&");

  return `${path}?${redacted}`;
};

export const requestLogger: RequestHandler = (req, res, next) => {
  const startedAt = Date.now();
  const safeUrl = redactSensitiveQuery(req.originalUrl);

  res.on("finish", () => {
    logger.info(
      {
        method: req.method,
        url: safeUrl,
        status: res.statusCode,
        durationMs: Date.now() - startedAt,
        requestId: req.id,
      },
      `${req.method} ${safeUrl} ${res.statusCode}`
    );
  });

  next();
};
