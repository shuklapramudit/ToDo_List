import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    CreateTaskController,
    getAllTaskController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController,
} from "../controllers/taskController.js";

const router = express.Router();

// Apply authMiddleware globally across all task endpoints
router.use(authMiddleware);

router.post("/", CreateTaskController);
router.get("/", getAllTaskController);
router.get("/:id", getTaskByIdController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;