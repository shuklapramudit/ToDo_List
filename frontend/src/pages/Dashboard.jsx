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
            setStatus("Pending");
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add task.");
        } finally {
            setLoading(false);
        }
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
                                        {task.status && (
                                            <span className={`task-status ${task.status.toLowerCase().replace(/\s+/g, "-")}`}>
                                                {task.status}
                                            </span>
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
