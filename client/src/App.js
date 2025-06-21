// src/App.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Register     from './pages/Register';
import Login        from './pages/Login';
import Dashboard    from './pages/Dashboard';
import SettingsPage from './pages/SettingsPage';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token
    ? children
    : <Navigate to="/login" replace />;
}

export default function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
  }, []);

  // pass this into Login so it can update auth state
  const handleSetAuth = auth => setAuthenticated(auth);

  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard (ProtectedRoute will forward to login if needed) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setAuth={handleSetAuth} />}
        />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}