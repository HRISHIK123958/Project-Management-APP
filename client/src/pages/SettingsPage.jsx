// src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // No project selected on settings
  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white/80 rounded-full shadow"
        onClick={() => setSidebarOpen(o => !o)}
      >
        <Bars3Icon className="h-6 w-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <Header
          projects={[]}
          currentProject={null}
          onSelect={() => {}}
          breadcrumbs={breadcrumbs}
        />

        <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-6">Settings</h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow transition"
          >
            <XMarkIcon className="h-6 w-6" />
            Logout
          </button>
        </main>
      </div>
    </div>
  );
}
