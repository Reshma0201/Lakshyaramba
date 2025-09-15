import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/Pages/home-page";
import LoginPage from "./components/Pages/login-page";
import ProfilePage from "./components/Pages/profile-page";
import NotFoundPage from "./components/Pages/not-found-page";
import RegisterPage from "./components/Pages/register-pages";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/protected-route";
import TodoApp from "./components/Todoapp.jsx"; // new separate file
import AllTodos from "./components/Pages/Todoall";
import useAuthStore from "./stores/authStore";

const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public pages */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* TodoApp (no auth required, but you can wrap in ProtectedRoute if needed) */}
          <Route path="/" element={<TodoApp />} />
          <Route path="todo" element={<TodoApp />} />
          <Route path="Todoall" element={<AllTodos/>} />
          {/* Protected profile */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
