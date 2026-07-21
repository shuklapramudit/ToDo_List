import db from "../config/db.js";

// 1. Get all tasks for a specific user
export const getTasksByUserId = async (userId) => {
  const query = `
    SELECT * FROM tasks 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `;
  const [rows] = await db.query(query, [userId]);
  return rows;
};

// Alias export so taskController import doesn't fail
export const getAllTask = getTasksByUserId;
export const getAllTasks = getTasksByUserId;

// 2. Create a new task
export const createTask = async (title, description, priority, status, userId) => {
  const query = `
    INSERT INTO tasks (title, description, priority, status, user_id) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(query, [
    title,
    description,
    priority || "Low",
    status || "Pending",
    userId,
  ]);
  return result;
};

// 3. Update an existing task
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

// 4. Delete a task
export const deleteTask = async (taskId, userId) => {
  const query = `
    DELETE FROM tasks 
    WHERE id = ? AND user_id = ?
  `;
  const [result] = await db.query(query, [taskId, userId]);
  return result;
};