import { pool } from "../database/pool.js";

async function checkReadiness() {
  await pool.query("SELECT 1");

  return {
    database: "up",
  };
}

export const healthService = {
  checkReadiness,
};
