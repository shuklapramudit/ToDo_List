import db from "../config/db.js";

// 1. Get task by ID
export const getById = async (taskId) => {
  try {
    const query = `
      SELECT id, task_name AS title, description, priority, status, comment, user_id, created_at 
      FROM tasks 
      WHERE id = ?
    `;
    const [rows] = await db.query(query, [taskId]);
    return rows[0] || null;
  } catch (err) {
    console.error("Error fetching task by ID:", err.message);
    return null;
  }
};

export const getTaskById = getById;

// 2. Get all tasks for logged-in user
export const getTasksByUserId = async (userId) => {
  try {
    const query = `
      SELECT id, task_name AS title, description, priority, status, comment, user_id, created_at 
      FROM tasks 
      WHERE user_id = ? OR user_id IS NULL 
      ORDER BY id DESC
    `;
    const [rows] = await db.query(query, [userId || null]);
    return rows || [];
  } catch (err) {
    try {
      const fallbackQuery = `
        SELECT id, task_name AS title, description, priority, status, created_at 
        FROM tasks 
        ORDER BY id DESC
      `;
      const [rows] = await db.query(fallbackQuery);
      return rows || [];
    } catch (fallbackErr) {
      return [];
    }
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
      userId || null,
    ]);
    return result;
  } catch (err) {
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

// 4. Update task status and comment
export const updateTask = async (taskId, title, description, priority, status, userId, comment) => {
  try {
    const query = `
      UPDATE tasks 
      SET task_name = COALESCE(?, task_name), 
          description = COALESCE(?, description), 
          priority = COALESCE(?, priority), 
          status = COALESCE(?, status),
          comment = COALESCE(?, comment)
      WHERE id = ?
    `;
    const [result] = await db.query(query, [
      title || null,
      description || null,
      priority || null,
      status || null,
      comment || null,
      taskId,
    ]);
    return result;
  } catch (err) {
    const fallbackQuery = `
      UPDATE tasks 
      SET task_name = COALESCE(?, task_name), 
          description = COALESCE(?, description), 
          priority = COALESCE(?, priority), 
          status = COALESCE(?, status)
      WHERE id = ?
    `;
    const [result] = await db.query(fallbackQuery, [
      title || null,
      description || null,
      priority || null,
      status || null,
      taskId,
    ]);
    return result;
  }
};

// 5. Delete task
export const deleteTask = async (taskId, userId) => {
  try {
    const query = `DELETE FROM tasks WHERE id = ?`;
    const [result] = await db.query(query, [taskId]);
    return result;
  } catch (err) {
    throw err;
  }
};