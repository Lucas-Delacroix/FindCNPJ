import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

const server = app.listen(env.PORT, () => {
  logger.info(
    { port: env.PORT, env: env.NODE_ENV },
    `FindCNPJ API iniciada em http://localhost:${env.PORT}`
  );
});

const shutdown = (signal: string): void => {
  logger.info({ signal }, "Encerrando servidor...");
  server.close(() => {
    logger.info("Servidor encerrado.");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
