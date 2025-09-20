import React, { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import { Link } from 'react-router';
import useAuth from "../../hooks/useAuth.js";

import './Todoall.css';

function AllTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await apiClient.get("/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>All Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} ({todo.category}) -{" "}
            {todo.completed ? "✅ Completed" : "❌ Not Completed"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTodos;
