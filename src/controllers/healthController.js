import { healthService } from "../services/healthService.js";

function getLiveness(req, res) {
  res.set("Cache-Control", "no-store");

  return res.status(200).json({
    status: "ok",
  });
}

async function getReadiness(req, res) {
  res.set("Cache-Control", "no-store");

  try {
    const checks = await healthService.checkReadiness();

    return res.status(200).json({
      status: "ready",
      checks,
    });
  } catch (error) {
    console.error("Readiness check failed:", {
      name: error.name,
      code: error.code,
      message: error.message,
    });

    return res.status(503).json({
      status: "not_ready",
      checks: {
        database: "down",
      },
    });
  }
}

export const healthController = {
  getLiveness,
  getReadiness,
};
