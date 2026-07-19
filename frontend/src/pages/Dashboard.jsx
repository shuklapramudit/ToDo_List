import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";
import "../style/Auth.css";

function Dashboard() {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("High");
    const [status, setStatus] = useState("Pending");
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedStatus, setEditedStatus] = useState("");
    const [completionComment, setCompletionComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await axios.get("http://localhost:5000/api/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(res.data.data || []);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load tasks.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to create a task.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:5000/api/tasks",
                {
                    task_name: taskName,
                    description,
                    priority,
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess(res.data.message || "Task added successfully.");
            setTaskName("");
            setDescription("");
            setPriority("High");
            setStatus("Pending");
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add task.");
        } finally {
            setLoading(false);
        }
    };

    const startEditingStatus = (task) => {
        setEditingTaskId(task.id);
        setEditedStatus(task.status || "Pending");
        setCompletionComment("");
        setSuccess("");
        setError("");
    };

    const cancelEditingStatus = () => {
        setEditingTaskId(null);
        setEditedStatus("");
        setCompletionComment("");
    };

    const updateTaskStatus = async (taskId, taskName, description, priority, newStatus, comment = "") => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to update task status.");
            return;
        }

        try {
            setLoading(true);
            await axios.put(
                `http://localhost:5000/api/tasks/${taskId}`,
                {
                    task_name: taskName,
                    description,
                    priority,
                    status: newStatus,
                    completion_comment: comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess("Task status updated.");
            cancelEditingStatus();
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update task status.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusSave = async (task) => {
        const allowed = ["Pending", "In Progress", "Completed"];
        if (!allowed.includes(editedStatus)) {
            setError("Please choose Pending, In Progress, or Completed.");
            return;
        }

        await updateTaskStatus(task.id, task.task_name, task.description, task.priority, editedStatus, editedStatus === "Completed" ? completionComment : "");
    };

    return (
        <div className="dashboard">
            <Header />

            <div className="dashboard-header">
                <div>
                    <h1>My Todo Dashboard</h1>
                    <p className="dashboard-subtitle">Create tasks and review the latest todos here.</p>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="task-panel">
                    <h2>Create Todo</h2>

                    {error && <div className="alert error">{error}</div>}
                    {success && <div className="alert success">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Task Name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Task Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Add Todo"}
                        </button>
                    </form>
                </div>

                <div className="task-list">
                    <div className="task-list-header">
                        <h2>Latest Created Tasks</h2>
                        <span>{tasks.length} tasks</span>
                    </div>

                    {tasks.length === 0 ? (
                        <p className="empty-state">No tasks yet. Add a todo to get started.</p>
                    ) : (
                        tasks.map((task) => (
                            <div className="task-card" key={task.id}>
                                <div className="task-card-header">
                                    <h3>{task.task_name}</h3>
                                    <div className="task-card-tags">
                                        <span className={`task-priority ${task.priority.toLowerCase()}`}>
                                            {task.priority}
                                        </span>
                                        {editingTaskId === task.id ? (
                                            <div className="task-status-edit">
                                                <select value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                                {editedStatus === "Completed" && (
                                                    <textarea
                                                        className="status-comment"
                                                        value={completionComment}
                                                        onChange={(e) => setCompletionComment(e.target.value)}
                                                        placeholder="Enter completion comment..."
                                                    />
                                                )}
                                                <div className="status-actions">
                                                    <button type="button" className="btn-save" onClick={() => handleStatusSave(task)} disabled={loading}>
                                                        Save
                                                    </button>
                                                    <button type="button" className="btn-cancel" onClick={cancelEditingStatus}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            task.status && (
                                                <span
                                                    className={`task-status ${task.status.toLowerCase().replace(/\s+/g, "-")}`}
                                                    onClick={() => startEditingStatus(task)}
                                                    title="Click to change status"
                                                >
                                                    {task.status}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                                <p>{task.description}</p>
                                <div className="task-meta">
                                    <span>Created: {new Date(task.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
