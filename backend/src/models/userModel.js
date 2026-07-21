import db from "../config/db.js";

// Get user by email
const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = ?
  `;
  const [rows] = await db.query(query, [email]);
  return rows;
};

// Create new user
const createUser = async (name, email, password) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(query, [name, email, password]);
  return result;
};

export { createUser, getUserByEmail };