import express, { type Express } from "express";
import cors from "cors";
import { healthRoutes } from "./routes/health.routes";
import { cnpjRoutes } from "./routes/cnpj.routes";
import { errorHandler } from "./middlewares/error-handler";
import { requestLogger } from "./middlewares/request-logger";

export const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

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
