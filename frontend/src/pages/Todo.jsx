import React from "react";
import "./Todo.css"
function Todo(){
    return (
        <div>
            <form>
                <label htmlFor="name">Task Name</label>
                <input id="name" type="text" placeholder="Enter your task Name"  required/>
                <label htmlFor="description">Task Description</label>
                <input id="description" type="text" placeholder="Enter the task description" required/>
                <label htmlFor="priority">Priority</label>
                <select id="priority">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}
export default Todo;