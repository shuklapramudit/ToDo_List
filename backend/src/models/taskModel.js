import db from "../config/db.js";

// 1. Get task by ID
export const getById = async (taskId) => {
  const query = `
    SELECT id, task_name AS title, description, priority, status, user_id, created_at 
    FROM tasks 
    WHERE id = ?
  `;
  try {
    const [rows] = await db.query(query, [taskId]);
    return rows[0];
  } catch (err) {
    // Fallback if aliased column fails
    const fallbackQuery = `SELECT * FROM tasks WHERE id = ?`;
    const [rows] = await db.query(fallbackQuery, [taskId]);
    return rows[0];
  }
};

export const getTaskById = getById;

// 2. Get all tasks for a specific user
export const getTasksByUserId = async (userId) => {
  // Uses exact task_name and user_id columns from DB
  const query = `
    SELECT id, task_name AS title, description, priority, status, user_id, created_at 
    FROM tasks 
    WHERE user_id = ? 
    ORDER BY id DESC
  `;
  try {
    const [rows] = await db.query(query, [userId]);
    return rows;
  } catch (err) {
    // Fallback if user_id filtering encounters unexpected error
    const fallbackQuery = `
      SELECT id, task_name AS title, description, priority, status, created_at 
      FROM tasks 
      ORDER BY id DESC
    `;
    const [rows] = await db.query(fallbackQuery);
    return rows;
  }
};

export const getAllTask = getTasksByUserId;
export const getAllTasks = getTasksByUserId;

// 3. Create a new task
export const createTask = async (title, description, priority, status, userId) => {
  try {
    const query = `
      INSERT INTO tasks (task_name, description, priority, status, user_id) 
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
    // Fallback without user_id if needed
    const fallbackQuery = `
      INSERT INTO tasks (task_name, description, priority, status) 
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(fallbackQuery, [
      title || "Untitled Task",
      description || "",
      priority || "Low",
      status || "Pending",
    ]);
    return result;
  }
};

// 4. Update an existing task
export const updateTask = async (taskId, title, description, priority, status, userId) => {
  const query = `
    UPDATE tasks 
    SET task_name = ?, description = ?, priority = ?, status = ? 
    WHERE id = ? AND user_id = ?
  `;
  try {
    const [result] = await db.query(query, [
      title,
      description,
      priority,
      status,
      taskId,
      userId
    ]);
    return result;
  } catch (err) {
    const fallbackQuery = `
      UPDATE tasks 
      SET task_name = ?, description = ?, priority = ?, status = ? 
      WHERE id = ?
    `;
    const [result] = await db.query(fallbackQuery, [
      title,
      description,
      priority,
      status,
      taskId
    ]);
    return result;
  }
};

// 5. Delete a task
export const deleteTask = async (taskId, userId) => {
  const query = `
    DELETE FROM tasks 
    WHERE id = ? AND user_id = ?
  `;
  try {
    const [result] = await db.query(query, [taskId, userId]);
    return result;
  } catch (err) {
    const fallbackQuery = `DELETE FROM tasks WHERE id = ?`;
    const [result] = await db.query(fallbackQuery, [taskId]);
    return result;
  }
};