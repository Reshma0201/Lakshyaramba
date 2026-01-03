import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";
import './Todoapp.css';
function TodoApp() {
  // state definitions
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("Others");

  //  fetch todos on first render
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


  //  add new todo
  const addTodo = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    try {
      const response = await apiClient.post("/todos", {
        title: input,
        category,
        deadline,
        
      });

      setTodos([...todos, response.data]); // append new todo
      setInput("");
      setCategory("");
      setDeadline("");
    } catch (error) {
      console.error("Error adding todo:", error.response?.data || error.message);
    }
  };
  // toggle done
const toggleDone = async (id, completed) => {
  try {
    const response = await apiClient.put(`/todos/${id}`, { completed: !completed });

    // Step 1: update state immediately (show check + strikethrough)
    setTodos(todos.map((t) => (t._id === id ? response.data : t)));

    // Step 2: after 1.5s, remove from UI if completed
    /* if (!completed) {
      setTimeout(() => {
        setTodos((prev) => prev.filter((t) => t._id !== id));
      }, 500); // 500ms = 0.5 seconds
    }*/
  } catch (error) {
    console.error("Error updating todo:", error.response?.data || error.message);
  }
};

  //delete todo
  const deleteTodo = async (id) => {
    try {
      await apiClient.delete(`/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.response?.data || error.message);
    }
 
  };

const completedCount = todos.filter(todo => todo.completed).length;
  return (
    <>
     
<div className="contain">
  <div className="top"> 
      <b>To-do list </b> 
        <Link to="/Todoall">
          <button style={{ marginTop: "10px", fontSize: 13, padding: 3.1, borderRadius: 5}}>View All Todos</button>
        </Link>
      </div>

  <div className="middle1">
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
</div>

      {/* list */}
  <div className="middle2">
        Pending tasks:
    <ul>
  {todos.filter(todo => !todo.completed)
  .map((todo) => (
   <li key={todo._id} className="todo-item">
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => toggleDone(todo._id, todo.completed)}
  />

  <div className="todo-text">
    <div className="todo-title">
      {todo.title} ({todo.category})
    </div>

    {todo.deadline && (
      <div className="todo-deadline">
        Deadline: {new Date(todo.deadline).toLocaleString()}
      </div>
    )}
  </div>

  <button onClick={() => deleteTodo(todo._id)}>❌</button>
</li>


  ))}
</ul>
</div >
 Total task completed: {completedCount}
    </div>

<div className= "container2">
   </div> 
</>
  );

}


export default TodoApp;

