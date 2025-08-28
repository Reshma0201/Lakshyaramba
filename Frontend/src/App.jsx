import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import useAuthStore from "./stores/authStore";
import './App.css';
import RegisterPage from "../components/pages/register-page";


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

function App() {

  const [todos, setTodos] = useState([]); 
  const [input, setInput] = useState(""); 
  const [count, setCount] = useState(0)
const [category, setCategory] = useState("Chores"); // added state for category

  const addTodo = () => {
  if (input.trim() === "") return; // ignore empty input
  setTodos([...todos, { text: input, done: false, category}]); // add new task
  setInput(""); // clear input
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
    }, 1000); // 1000ms = 1 second
  }
  setTodos(newTodos); // update state or Updates React state so the UI refreshes and the task list changes.
};

  return (
  
    <>
  <div className="container">
    <h1>To-Do List</h1>


    <form onSubmit={(e) => { 
    e.preventDefault(); // prevent page reload
    addTodo();          // call the function to add task
}}>
  <input 
          type="text" 
          value={input} //links the input box to React’s state
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter your task" 
        />
        <button type="submit">Add</button>
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
   <option value="Chores">Chores</option>
            <option value="Education">Education</option>
            <option value="Food">Food</option>
            <option value="Health">Health</option>
            <option value="Fashion">Fashion</option>
            <option value="Others">Others</option>
      </select>

      </form>
 <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input 
        type="checkbox" 
        checked={todo.done} 
        onChange={() => toggleDone(index)} 
      />
            {todo.text} <span>({todo.category})</span>
      {/*<button onClick={() => toggleDone(index)}>Done</button> */}
          </li>
        ))}
      </ul>
    </div>
    </> 
  );
}

export default App;
