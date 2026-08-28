import { pool } from "../src/database/pool.js";

async function checkDatabase() {
  try {
    const result = await pool.query(`
            SELECT
                current_database() AS database_name,
                current_user AS database_user,
                NOW() AS database_time
            `);

    console.log("Database connection successful:");
    console.table(result.rows);
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);

    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

await checkDatabase();
