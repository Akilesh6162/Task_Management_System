import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/tasks";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function fetchTasks() {
        const response = await axios.get(API_URL);
        setTasks(response.data);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    async function addTask(e) {
        e.preventDefault();

        if (!title.trim()) return;

        await axios.post(API_URL, {
            title,
            description
        });

        setTitle("");
        setDescription("");

        fetchTasks();
    }

    async function toggleTask(task) {
        await axios.put(`${API_URL}/${task.id}`, {
            title: task.title,
            description: task.description,
            completed: !task.completed
        });

        fetchTasks();
    }

    async function deleteTask(id) {
        await axios.delete(`${API_URL}/${id}`);
        fetchTasks();
    }

    return (
        <div className="container">
            <h1>Task Manager</h1>

            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Task description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <button type="submit">
                    Add Task
                </button>
            </form>

            <h2>My Tasks</h2>

            {tasks.map((task) => (
                <div className="task" key={task.id}>
                    <div>
                        <h3 className={
                            task.completed ? "completed" : ""
                        }>
                            {task.title}
                        </h3>

                        <p>{task.description}</p>
                    </div>

                    <div className="actions">
                        <button
                            onClick={() => toggleTask(task)}
                        >
                            {task.completed
                                ? "Undo"
                                : "Complete"}
                        </button>

                        <button
                            className="delete"
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}