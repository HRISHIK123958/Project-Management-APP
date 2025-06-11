import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // ✅ Make sure this file exists
import SettingsPage from './pages/SettingsPage';

const App = () => {
  const [isAuthenticated, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuth(!!token);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard & Projects both use the same component */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects"  element={<Dashboard />} />

        {/* Your settings page */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
