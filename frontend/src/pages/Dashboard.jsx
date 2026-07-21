import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/Auth.css";

// Single active Backend API Endpoint
const API_URL = "https://todo-list-b66a.onrender.com/api/tasks";

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

    // Auto-dismiss alert popups after 4 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedData = res.data?.data || res.data || [];
            setTasks(Array.isArray(fetchedData) ? fetchedData : []);
            setError("");
        } catch (err) {
            console.error("Fetch tasks error:", err);
            // Safe fallback: new users with 0 tasks will simply see empty list without red error banner
            setTasks([]);
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
                API_URL,
                {
                    task_name: taskName,
                    description,
                    priority,
                    status,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setSuccess(res.data?.message || "Task added successfully.");
            setTaskName("");
            setDescription("");
            setPriority("High");
            setStatus("Pending");
            fetchTasks();
        } catch (err) {
            console.error("Create task error:", err);
            setError(err.response?.data?.message || "Failed to add task.");
        } finally {
            setLoading(false);
        }
    };

    const startEditingStatus = (task) => {
        setEditingTaskId(task.id);
        setEditedStatus(task.status || "Pending");
        setCompletionComment(task.comment || "");
        setSuccess("");
        setError("");
    };

    const cancelEditingStatus = () => {
        setEditingTaskId(null);
        setEditedStatus("");
        setCompletionComment("");
    };

    const updateTaskStatus = async (taskId, tName, desc, prio, newStatus, comment = "") => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to update status.");
            return;
        }

        try {
            setLoading(true);
            await axios.put(
                `${API_URL}/${taskId}`,
                {
                    task_name: tName,
                    description: desc,
                    priority: prio,
                    status: newStatus,
                    completion_comment: comment,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
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

        await updateTaskStatus(
            task.id,
            task.task_name || task.title,
            task.description,
            task.priority,
            editedStatus,
            editedStatus === "Completed" ? completionComment : ""
        );
    };

    return (
        <div className="page-wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />

            <main className="dashboard" style={{ flex: 1 }}>
                <div className="dashboard-header">
                    <div>
                        <div className="header-icon-row">
                            <span className="header-icon">📋</span>
                            <h1>My Todo Dashboard</h1>
                        </div>
                        <p className="dashboard-subtitle">Create tasks and review the latest todos here.</p>
                    </div>
                    <div className="header-decoration"></div>
                </div>

                <div className="dashboard-content">
                    <div className="task-panel">
                        <div className="panel-header">
                            <h2>Create Todo</h2>
                            <span className="panel-badge">New Task</span>
                        </div>

                        {error && <div className="alert error">{error}</div>}
                        {success && <div className="alert success">{success}</div>}

                        <form onSubmit={handleSubmit} className="task-form">
                            <div className="form-group">
                                <label htmlFor="taskName">Task Name</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📝</span>
                                    <input
                                        id="taskName"
                                        type="text"
                                        placeholder="e.g., Complete project proposal"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📄</span>
                                    <input
                                        id="description"
                                        type="text"
                                        placeholder="Brief details about the task"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="priority">Priority</label>
                                    <div className="select-wrapper">
                                        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                        <span className="select-arrow">▼</span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <div className="select-wrapper">
                                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        <span className="select-arrow">▼</span>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? "Saving..." : "+ Add Todo"}
                            </button>
                        </form>
                    </div>

                    <div className="task-list">
                        <div className="stats-row">
                            <div className="stat-card total">
                                <span className="stat-icon">📊</span>
                                <div className="stat-info">
                                    <span className="stat-value">{tasks.length}</span>
                                    <span className="stat-label">Total</span>
                                </div>
                            </div>
                            <div className="stat-card pending">
                                <span className="stat-icon">⏳</span>
                                <div className="stat-info">
                                    <span className="stat-value">{tasks.filter((t) => t.status === "Pending").length}</span>
                                    <span className="stat-label">Pending</span>
                                </div>
                            </div>
                            <div className="stat-card in-progress">
                                <span className="stat-icon">🔄</span>
                                <div className="stat-info">
                                    <span className="stat-value">{tasks.filter((t) => t.status === "In Progress").length}</span>
                                    <span className="stat-label">In Progress</span>
                                </div>
                            </div>
                            <div className="stat-card completed">
                                <span className="stat-icon">✅</span>
                                <div className="stat-info">
                                    <span className="stat-value">{tasks.filter((t) => t.status === "Completed").length}</span>
                                    <span className="stat-label">Completed</span>
                                </div>
                            </div>
                        </div>

                        <div className="task-list-header">
                            <h2>Latest Created Tasks</h2>
                            <span>{tasks.length} tasks</span>
                        </div>

                        {tasks.length === 0 ? (
                            <div className="empty-state">
                                <span className="empty-icon">📝</span>
                                <p>No tasks yet. Add a todo to get started.</p>
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <div className="task-card" key={task.id || index}>
                                    <div className="task-card-header">
                                        <h3>{task.task_name || task.title}</h3>
                                        <div className="task-card-tags">
                                            <span className={`task-priority ${(task.priority || "Low").toLowerCase()}`}>
                                                {task.priority === "High" ? "🔴" : task.priority === "Medium" ? "🟡" : "🟢"} {task.priority}
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
                                                        {task.status === "Pending" ? "⏳" : task.status === "In Progress" ? "🔄" : "✅"} {task.status}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <p>{task.description}</p>
                                    {task.comment && <blockquote className="task-comment-preview">💬 {task.comment}</blockquote>}
                                    <div className="task-meta">
                                        <span>🕒 Created: {task.created_at ? new Date(task.created_at).toLocaleString() : "Recently"}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Dashboard;