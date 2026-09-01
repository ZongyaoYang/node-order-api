import app from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./database/pool.js";

const server = app.listen(env.PORT, () => {
  console.log(
    `Server running in ${env.NODE_ENV} at http://localhost:${env.PORT}`,
  );
});

let isShuttingDown = false;

async function shutdown(signal) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  console.log(`${signal} received. Starting graceful shutdown.`);

  const forceShutdownTimer = setTimeout(() => {
    console.error(`Graceful shutdown exceeded ${env.SHUTDOWN_TIMEOUT_MS}ms.`);

    server.closeAllConnections();
    process.exit(1);
  }, env.SHUTDOWN_TIMEOUT_MS);

  // The timer should not keep the process alive by itself.
  forceShutdownTimer.unref();

  server.close(async (serverError) => {
    try {
      if (serverError) {
        throw serverError;
      }

      console.log("HTTP server closed.");

      await pool.end();

      console.log("PostgreSQL connection pool closed.");
      console.log("Graceful shutdown complete.");

      process.exit(0);
    } catch (error) {
      console.error("Error during graceful shutdown: ", error);
      process.exit(1);
    }
  });
}

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});
