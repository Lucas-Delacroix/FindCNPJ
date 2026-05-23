import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

const HEADER = "X-Request-ID";

export const requestId: RequestHandler = (req, res, next) => {
  const incoming = req.header(HEADER);
  const id = incoming && incoming.trim().length > 0 ? incoming.trim() : randomUUID();
  req.id = id;
  res.setHeader(HEADER, id);
  next();
};
