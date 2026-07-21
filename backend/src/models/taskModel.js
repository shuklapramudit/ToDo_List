import db from "../config/db.js";

// 1. Get single task by ID (Only if it belongs to the logged-in user)
export const getById = async (taskId, userId) => {
  try {
    const query = `
      SELECT id, task_name AS title, description, priority, status, comment, user_id, created_at 
      FROM tasks 
      WHERE id = ? AND user_id = ?
    `;
    const [rows] = await db.query(query, [taskId, userId]);
    return rows[0] || null;
  } catch (err) {
    console.error("Error fetching task by ID:", err.message);
    return null;
  }
};

export const getTaskById = getById;

// 2. Get ONLY logged-in user's tasks (Strict User Isolation)
export const getTasksByUserId = async (userId) => {
  try {
    if (!userId) return []; // Agar user_id missing hai toh empty array return karo

    const query = `
      SELECT id, task_name AS title, description, priority, status, comment, user_id, created_at 
      FROM tasks 
      WHERE user_id = ? 
      ORDER BY id DESC
    `;
    const [rows] = await db.query(query, [userId]);
    return rows || [];
  } catch (err) {
    console.error("Error fetching tasks for user:", err.message);
    return [];
  }
};

export const getAllTask = getTasksByUserId;
export const getAllTasks = getTasksByUserId;

// 3. Create task linked strictly to the logged-in user
export const createTask = async (title, description, priority, status, userId) => {
  try {
    if (!userId) throw new Error("User ID is required to create a task.");

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
    console.error("Error creating task:", err.message);
    throw err;
  }
};

// 4. Update task (Only if task belongs to this logged-in user)
export const updateTask = async (taskId, title, description, priority, status, userId, comment) => {
  try {
    const query = `
      UPDATE tasks 
      SET task_name = COALESCE(?, task_name), 
          description = COALESCE(?, description), 
          priority = COALESCE(?, priority), 
          status = COALESCE(?, status),
          comment = COALESCE(?, comment)
      WHERE id = ? AND user_id = ?
    `;
    const [result] = await db.query(query, [
      title || null,
      description || null,
      priority || null,
      status || null,
      comment || null,
      taskId,
      userId,
    ]);
    return result;
  } catch (err) {
    console.error("Error updating task:", err.message);
    throw err;
  }
};

// 5. Delete task (Only if task belongs to this logged-in user)
export const deleteTask = async (taskId, userId) => {
  try {
    const query = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
    const [result] = await db.query(query, [taskId, userId]);
    return result;
  } catch (err) {
    console.error("Delete Task Error:", err.message);
    throw err;
  }
};