import db from "../config/db.js";

// 1. Get Tasks STRICTLY for logged-in user ID
export const getTasksByUserId = async (userId) => {
  try {
    const numericUserId = Number(userId);

    // Agar userId valid nahi hai toh empty list return karo
    if (!numericUserId || isNaN(numericUserId)) {
      return [];
    }

    // Strict user_id equality check
    const query = `
      SELECT id, task_name AS title, description, priority, status, comment, user_id, created_at 
      FROM tasks 
      WHERE user_id = ? 
      ORDER BY id DESC
    `;
    
    const [rows] = await db.query(query, [numericUserId]);
    return rows || [];
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    return [];
  }
};

export const getAllTask = getTasksByUserId;
export const getAllTasks = getTasksByUserId;

// 2. Get Single Task by ID
export const getById = async (taskId, userId) => {
  try {
    const query = `
      SELECT id, task_name AS title, description, priority, status, comment, user_id, created_at 
      FROM tasks 
      WHERE id = ? AND user_id = ?
    `;
    const [rows] = await db.query(query, [taskId, Number(userId)]);
    return rows[0] || null;
  } catch (err) {
    console.error("Error fetching task by ID:", err.message);
    return null;
  }
};

export const getTaskById = getById;

// 3. Create Task linked strictly to user_id
export const createTask = async (title, description, priority, status, userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required to create a task.");
    }

    const query = `
      INSERT INTO tasks (task_name, description, priority, status, user_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [
      title || "Untitled Task",
      description || "",
      priority || "Low",
      status || "Pending",
      Number(userId)
    ]);
    return result;
  } catch (err) {
    console.error("Error creating task:", err.message);
    throw err;
  }
};

// 4. Update Task (Ownership Filtered)
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
      Number(userId)
    ]);
    return result;
  } catch (err) {
    console.error("Error updating task:", err.message);
    throw err;
  }
};

// 5. Delete Task (Ownership Filtered)
export const deleteTask = async (taskId, userId) => {
  try {
    const query = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
    const [result] = await db.query(query, [taskId, Number(userId)]);
    return result;
  } catch (err) {
    console.error("Delete Task Error:", err.message);
    throw err;
  }
};