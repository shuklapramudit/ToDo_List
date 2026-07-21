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
  const query = `
    SELECT * FROM tasks 
    WHERE user_id = ? 
    ORDER BY id DESC
  `;
  const [rows] = await db.query(query, [userId]);
  return rows;
};

// Aliases for taskController
export const getAllTask = getTasksByUserId;
export const getAllTasks = getTasksByUserId;

// 3. Create a new task
export const createTask = async (title, description, priority, status, userId) => {
  const query = `
    INSERT INTO tasks (title, description, priority, status, user_id) 
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
};

// 4. Update an existing task
export const updateTask = async (taskId, title, description, priority, status, userId) => {
  const query = `
    UPDATE tasks 
    SET title = ?, description = ?, priority = ?, status = ? 
    WHERE id = ? AND user_id = ?
  `;
  const [result] = await db.query(query, [
    title,
    description,
    priority,
    status,
    taskId,
    userId,
  ]);
  return result;
};

// 5. Delete a task
export const deleteTask = async (taskId, userId) => {
  const query = `
    DELETE FROM tasks 
    WHERE id = ? AND user_id = ?
  `;
  const [result] = await db.query(query, [taskId, userId]);
  return result;
};