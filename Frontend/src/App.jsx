
import React, { useState } from "react";
import HomePage from "./components/Pages/home-page";
import LoginPage from "./components/Pages/login-page";
import ProfilePage from "./components/Pages/profile-page";
import NotFoundPage from "./components/Pages/not-found-page";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import useAuthStore from "./stores/authStore";
import './App.css';
import RegisterPage from "./components/Pages/register-pages";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/protected-route";

 const AppLayout = () => {
  const initializeAuth = useAuthStore(state => state.initializeAuth);
React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function TodoApp() {

  const [todos, setTodos] = useState([]); 
  const [input, setInput] = useState(""); 
  const [count, setCount] = useState(0)
  const [deadline, setDeadline] = useState("");
const [category, setCategory] = useState("Chores"); // added state for category

  const addTodo = () => {
  if (input.trim() === "") return; // ignore empty input
  setTodos([...todos, { text: input, done: false, category, deadline}]); // add new task
  setInput(""); // clear input
  setDeadline("");
};

const toggleDone = (index) => {
  const newTodos = [...todos];  //  Copies the task list so you don’t directly change React’s state.
  newTodos[index].done = !newTodos[index].done; // toggle between done/not done.

  if (newTodos[index].done) {
    // remove after 1 second
    setTimeout(() => {
      const updatedTodos = [...newTodos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
    }, 500); // 1000ms = 1 second
  }
  setTodos(newTodos); // update state or Updates React state so the UI refreshes and the task list changes.
};

  return (
  <>
    <div className="container">
      <h1>To-Do List</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
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

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
             <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(index)}
        />
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                color:
                  todo.deadline && new Date(todo.deadline) < new Date()
                    ? "red"
                    : "black",
              }}
              onClick={() => toggleDone(index)}
            >
              {todo.text} ({todo.category})
            </span>
            {todo.deadline && (
              <small> - Deadline: {new Date(todo.deadline).toLocaleString()}</small>
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
);
}

// keep App separate
const App = () => {
  return (
    
    <BrowserRouter>
  <Routes>
    <Route element={<Layout />} >
    {/* Public pages without AppLayout */}
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />

    {/* Pages with AppLayout */}
    
      <Route path="/" element={<TodoApp />} />
      <Route path="todo" element={<TodoApp />} />

      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Route>
    

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</BrowserRouter>

  );
}

export default App;





