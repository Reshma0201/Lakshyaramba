import { useState, useEffect } from "react";
import * as todoApi from "../api/todoApi.js";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await todoApi.fetchTodos();
        setTodos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  const addTodo = async (title) => {
    const newTodo = await todoApi.createTodo(title);
    setTodos((prev) => [...prev, newTodo]);
  };

  const removeTodo = async (id) => {
    await todoApi.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    const updated = await todoApi.updateTodo(id, { completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  return { todos, loading, addTodo, removeTodo, toggleTodo };
}
