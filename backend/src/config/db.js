import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test Database Connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL Connected Successfully (Pool Created)");
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:");
    console.error(err);
  }
})();

export default db;