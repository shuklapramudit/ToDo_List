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
    const fallbackQuery = `SELECT * FROM tasks WHERE id = ?`;
    const [rows] = await db.query(fallbackQuery, [taskId]);
    return rows[0];
  }
};

export const getTaskById = getById;

// 2. Get all tasks (Fetch all tasks directly to ensure dashboard display)
export const getTasksByUserId = async (userId) => {
  const query = `
    SELECT id, task_name AS title, description, priority, status, user_id, created_at 
    FROM tasks 
    ORDER BY id DESC
  `;
  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (err) {
    console.error("Fetch Tasks Error:", err);
    return [];
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
      userId || 1,
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

// 4. Update an existing task
export const updateTask = async (taskId, title, description, priority, status, userId) => {
  const query = `
    UPDATE tasks 
    SET task_name = ?, description = ?, priority = ?, status = ? 
    WHERE id = ?
  `;
  try {
    const [result] = await db.query(query, [
      title,
      description,
      priority,
      status,
      taskId,
    ]);
    return result;
  } catch (err) {
    console.error("Update Task Error:", err);
    throw err;
  }
};

// 5. Delete a task
export const deleteTask = async (taskId, userId) => {
  const query = `DELETE FROM tasks WHERE id = ?`;
  try {
    const [result] = await db.query(query, [taskId]);
    return result;
  } catch (err) {
    console.error("Delete Task Error:", err);
    throw err;
  }
};