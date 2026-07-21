import db from "../config/db.js";

// 1. Get task by ID
export const getById = async (taskId) => {
  const query = `SELECT * FROM tasks WHERE id = ?`;
  const [rows] = await db.query(query, [taskId]);
  return rows[0];
};

export const getTaskById = getById;

// 2. Get all tasks for a specific user
export const getTasksByUserId = async (userId) => {
  // Checks both userId and user_id to prevent database schema mismatch
  const query = `
    SELECT * FROM tasks 
    WHERE userId = ? OR user_id = ? 
    ORDER BY id DESC
  `;
  try {
    const [rows] = await db.query(query, [userId, userId]);
    return rows;
  } catch (err) {
    // Fallback if user_id column doesn't exist at all
    const fallbackQuery = `SELECT * FROM tasks WHERE userId = ? ORDER BY id DESC`;
    const [rows] = await db.query(fallbackQuery, [userId]);
    return rows;
  }
};

export const getAllTask = getTasksByUserId;
export const getAllTasks = getTasksByUserId;

// 3. Create a new task
export const createTask = async (title, description, priority, status, userId) => {
  try {
    const query = `
      INSERT INTO tasks (title, description, priority, status, userId) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [
      title || "Untitled Task",
      description || "",
      priority || "Low",
      status || "Pending",
      userId,
    ]);
    return result;
  } catch (err) {
    // Fallback if column is named user_id in DB
    const fallbackQuery = `
      INSERT INTO tasks (title, description, priority, status, user_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(fallbackQuery, [
      title || "Untitled Task",
      description || "",
      priority || "Low",
      status || "Pending",
      userId,
    ]);
    return result;
  }
};

// 4. Update an existing task
export const updateTask = async (taskId, title, description, priority, status, userId) => {
  const query = `
    UPDATE tasks 
    SET title = ?, description = ?, priority = ?, status = ? 
    WHERE id = ? AND (userId = ? OR user_id = ?)
  `;
  try {
    const [result] = await db.query(query, [
      title,
      description,
      priority,
      status,
      taskId,
      userId,
      userId
    ]);
    return result;
  } catch (err) {
    const fallbackQuery = `
      UPDATE tasks 
      SET title = ?, description = ?, priority = ?, status = ? 
      WHERE id = ? AND userId = ?
    `;
    const [result] = await db.query(fallbackQuery, [
      title,
      description,
      priority,
      status,
      taskId,
      userId
    ]);
    return result;
  }
};

// 5. Delete a task
export const deleteTask = async (taskId, userId) => {
  const query = `
    DELETE FROM tasks 
    WHERE id = ? AND (userId = ? OR user_id = ?)
  `;
  try {
    const [result] = await db.query(query, [taskId, userId, userId]);
    return result;
  } catch (err) {
    const fallbackQuery = `DELETE FROM tasks WHERE id = ? AND userId = ?`;
    const [result] = await db.query(fallbackQuery, [taskId, userId]);
    return result;
  }
};