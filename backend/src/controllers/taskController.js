import {
    createTask,
    getAllTask,
    getById,
    updateTask,
    deleteTask
} from "../models/taskModel.js";

const CreateTaskController = async (req, res) => {
    try {
        const { task_name, description, priority, status } = req.body;
        const result = await createTask(task_name, description, priority, status);

        res.status(201).json({
            success: true,
            message: "Task created successfully.",
            data: {
                id: result.insertId,
                task_name,
                description,
                priority,
                status: status || "Pending"
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllTaskController = async (req, res) => {
    try {
        const result = await getAllTask();

        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTaskByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getById(id);

        if (!Array.isArray(result) || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        res.status(200).json({
            success: true,
            data: result[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const updateTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const { task_name, description, priority, status } = req.body;

        const result = await updateTask(id, task_name, description, priority, status);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            data: {
                id,
                task_name,
                description,
                priority,
                status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteTask(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    CreateTaskController,
    getAllTaskController,
    getTaskByIdController,
    updateTaskController,
    deleteTaskController
};
