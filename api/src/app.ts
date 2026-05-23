import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { healthRoutes } from "./routes/health.routes";
import { cnpjRoutes } from "./routes/cnpj.routes";
import { errorHandler } from "./middlewares/error-handler";
import { requestLogger } from "./middlewares/request-logger";
import { requestId } from "./middlewares/request-id";
import { openapiDocument } from "./lib/openapi";

const parseCorsOrigin = (raw: string): string | string[] | boolean => {
  if (raw === "*" || raw.trim() === "") return true;
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length === 1 ? list[0]! : list;
};

export const app: Express = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(requestId);
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: parseCorsOrigin(env.CORS_ORIGIN),
    exposedHeaders: ["X-Request-ID"],
  })
);
app.use(express.json({ limit: "100kb" }));
app.use(requestLogger);

app.use(
  rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    limit: env.RATE_LIMIT_MAX,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
      error: {
        code: "RATE_LIMIT_EXCEEDED",
        message: "Muitas requisições — tente novamente em instantes.",
      },
    },
  })
);

app.get("/openapi.json", (_req, res) => {
  res.json(openapiDocument);
});
app.use(
  "/docs",
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "https:"],
      },
    },
  }),
  swaggerUi.serve,
  swaggerUi.setup(openapiDocument, {
    customSiteTitle: "FindCNPJ API — Documentação",
  })
);

app.use("/health", healthRoutes);
app.use("/cnpj", cnpjRoutes);

app.use((_req, res) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Rota não encontrada",
    },
  });
});

app.use(errorHandler);
