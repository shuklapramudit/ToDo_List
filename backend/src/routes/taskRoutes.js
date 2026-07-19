import express from "express";
import {
     CreateTaskController,
     getAllTaskController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController
} from "../controllers/taskController.js";

const router = express.Router();


// Create Task
router.post("/", CreateTaskController);

// Get All Tasks
router.get("/", getAllTaskController);

// Get Task By ID
router.get("/:id", getTaskByIdController);

// Update Task
router.put("/:id", updateTaskController);

// Delete Task
router.delete("/:id", deleteTaskController);

export default router;