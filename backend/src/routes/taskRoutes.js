import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    CreateTaskController,
    getAllTaskController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", authMiddleware, CreateTaskController);
router.get("/", authMiddleware, getAllTaskController);
router.get("/:id", authMiddleware, getTaskByIdController);
router.put("/:id", authMiddleware, updateTaskController);
router.delete("/:id", authMiddleware, deleteTaskController);

export default router;