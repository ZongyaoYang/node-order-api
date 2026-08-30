import express from "express";
import helmet from "helmet";
import cors from "cors";

import orderRoutes from "./routes/orderRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { env } from "./config/env.js";

const app = express();

const allowedOrigins = env.CORS_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Do not advertise the framework in response headers.
app.disable("x-powered-by");

// Add defensive HTTP headers.
app.use(helmet());

// Allow browser requests only from configured frontend origins.
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Idempotency-Key"],
  }),
);

// Parse JSON, but reject unusually large request bodies.
app.use(express.json({ limit: "100kb" }));

app.use("/health", healthRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);
export default app;
