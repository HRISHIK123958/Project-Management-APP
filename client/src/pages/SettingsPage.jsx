// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate }   from 'react-router-dom';
import Sidebar           from '../components/Sidebar';
import Header            from '../components/Header';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser]               = useState({ name: '', email: '' });
  const [theme, setTheme]             = useState('light');

  // Load user once
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Apply/remove `dark` class on <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  const breadcrumbs = [
    { label: 'Home', to: '/dashboard' },
    { label: 'Settings' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      {/* Sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white/80 dark:bg-gray-700 rounded-full shadow"
        onClick={() => setSidebarOpen(o => !o)}
      >
        <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-64">
        <Header
          projects={[]}
          currentProject={null}
          onSelect={() => {}}
          breadcrumbs={breadcrumbs}
        />

        <main className="flex-1 overflow-y-auto px-6 py-12 flex items-center justify-center">
          <div className="w-full max-w-md bg-white/80 dark:bg-gray-800 backdrop-blur-sm p-8 rounded-3xl shadow-2xl space-y-8">
            {/* User info */}
            <div className="flex flex-col items-center gap-2">
              <UserCircleIcon className="h-16 w-16 text-blue-500 dark:text-indigo-400" />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {user.name || '—'}
              </h3>
              <p className="text-gray-500 dark:text-gray-300">
                {user.email || '—'}
              </p>
            </div>

            {/* Theme toggle */}
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">Theme</span>
              <button
                onClick={toggleTheme}
                className="p-2 bg-white dark:bg-gray-600 rounded-full shadow"
                aria-label="Toggle theme"
              >
                {theme === 'light' 
                  ? <MoonIcon className="h-5 w-5 text-gray-700" />
                  : <SunIcon  className="h-5 w-5 text-yellow-400" />
                }
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg transition"
            >
              <XMarkIcon className="h-6 w-6" />
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}