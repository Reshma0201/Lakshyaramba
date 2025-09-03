// api/todoApi.js
import apiClient from "../utils/apiClient.js";

// Fetch all todos
export const fetchTodos = async () => {
  const { data } = await apiClient.get("/todos");
  return data;
};

// Create a new todo
export const createTodo = async (todo) => {
  const { data } = await apiClient.post("/todos", todo);
  return data;
};

// Update a todo
export const updateTodo = async (id, updates) => {
  const { data } = await apiClient.put(`/todos/${id}`, updates);
  return data;
};

// Delete a todo
export const deleteTodo = async (id) => {
  const { data } = await apiClient.delete(`/todos/${id}`);
  return data;
};
