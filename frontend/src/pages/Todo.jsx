import React, { useState } from "react";
import axios from "axios";
import "./Todo.css";

function Todo() {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        task_name: taskName,
        description: description,
        priority: priority,
        status: status,
      });

      console.log(response.data);

      alert("Task Added Successfully!");

      // Clear the form
      setTaskName("");
      setDescription("");
      setPriority("High");
      setStatus("Pending");
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Task Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <label htmlFor="description">Task Description</label>
        <input
          id="description"
          type="text"
          placeholder="Enter the task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
export default Todo;
