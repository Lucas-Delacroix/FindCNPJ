import { Router } from "express";

export const healthRoutes = Router();

healthRoutes.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "findcnpj-api",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
