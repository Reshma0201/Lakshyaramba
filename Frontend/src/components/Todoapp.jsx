// src/components/TodoApp.jsx
import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

function TodoApp() {
  // ✅ state definitions
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("Chores");

  // ✅ fetch todos on first render
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await apiClient.get("/todos"); // GET /api/todos
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error.response?.data || error.message);
      }
    };

    fetchTodos();
  }, []);

  // ✅ add new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    try {
      const response = await apiClient.post("/todos", {
        text: input,
        category,
        deadline,
      });

      setTodos([...todos, response.data]); // append new todo
      setInput("");
      setDeadline("");
    } catch (error) {
      console.error("Error adding todo:", error.response?.data || error.message);
    }
  };

  // ✅ toggle done
  const toggleDone = async (id, done) => {
    try {
      const response = await apiClient.put(`/todos/${id}`, { done: !done });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.error("Error updating todo:", error.response?.data || error.message);
    }
  };

  // ✅ delete todo
  const deleteTodo = async (id) => {
    try {
      await apiClient.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>

      {/* form */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your task"
        />

        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Others">Others</option>
          <option value="Chores">Chores</option>
          <option value="Coding">Coding</option>
          <option value="Assignment">Assignment</option>
          <option value="Learn">Learn</option>
        </select>

        <button type="submit">Add</button>
      </form>

      {/* list */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(todo._id, todo.done)}
            />
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                color:
                  todo.deadline && new Date(todo.deadline) < new Date()
                    ? "red"
                    : "black",
              }}
            >
              {todo.text} ({todo.category})
            </span>
            {todo.deadline && (
              <small> - Deadline: {new Date(todo.deadline).toLocaleString()}</small>
            )}
            <button onClick={() => deleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
