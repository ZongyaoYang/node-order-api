import "dotenv/config";
import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(3000),

  DATABASE_URL: z.string().trim().min(1, "DATABASE_URL is required."),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),

  CORS_ORIGINS: z.string().default("http://localhost:5173"),

  DB_POOL_MAX: z.coerce.number().int().positive().default(10),

  DB_CONNECTION_TIMEOUT_MS: z.coerce.number().int().positive().default(5000),

  DB_IDLE_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),

  SHUTDOWN_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
});

const result = environmentSchema.safeParse(process.env);

if (!result.success) {
  const message = result.error.issues
    .map((issue) => {
      const field = issue.path.join(".") || "environment";
      return `${field}: ${issue.message}`;
    })
    .join("\n");

  throw new Error(`Invalid environment configuration:\n${message}`);
}

export const env = result.data;
