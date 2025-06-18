// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DndTicketsBoard from '../components/DndTicketsBoard';  // <-- correct import
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTeamMembers, setNewTeamMembers] = useState('');

  // Fetch projects
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/projects`)
      .then(res => setProjects(res.data))
      .catch(console.error);
  }, []);

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Dashboard', to: '/dashboard' },
    currentProject && { label: currentProject.title }
  ].filter(Boolean);

  // Create project
  const createProject = async e => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/projects`, {
      title: newProject,
      description: newDescription,
      teamMembers: newTeamMembers.split(',').map(email => email.trim()),
    });
    setShowModal(false);
    setNewProject('');
    setNewDescription('');
    setNewTeamMembers('');
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
    setProjects(res.data);
  };

  // Update project
  const updateProject = async id => {
    const p = projects.find(p => p._id === id);
    const title = prompt('New title:', p.title);
    const desc  = prompt('New description:', p.description);
    const members = prompt('Team emails (comma):', p.teamMembers.join(', '));
    if (title && desc && members) {
      await axios.put(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        title,
        description: desc,
        teamMembers: members.split(',').map(m => m.trim())
      });
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
      setProjects(res.data);
    }
  };

  // Delete project
  const deleteProject = async id => {
    if (window.confirm('Delete this project?')) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${id}`);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
      setProjects(res.data);
      if (currentProject?._id === id) setCurrentProject(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-[#fee2e2] via-[#fef3c7] to-[#d1fae5] overflow-hidden relative">
      {/* Decorative SVG Overlay */}
      <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fee2e2" />
              <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
          <circle cx="70%" cy="30%" r="200" fill="#fcd34d" />
          <circle cx="30%" cy="70%" r="300" fill="#a5b4fc" />
        </svg>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-white/80 rounded-full shadow"
        onClick={() => setSidebarOpen(o => !o)}
      >
        <Bars3Icon className="h-6 w-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-64 relative z-10">
        {/* Header */}
        <Header
          projects={projects}
          currentProject={currentProject}
          onSelect={id => setCurrentProject(projects.find(p => p._id === id))}
          breadcrumbs={breadcrumbs}
        />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Add Project Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <PlusCircleIcon className="h-6 w-6" /> Add Project
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map(p => (
              <div
                key={p._id}
                onClick={() => setCurrentProject(p)}
                className={`relative p-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl shadow-lg 
                  hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer
                  ${currentProject?._id === p._id ? 'ring-4 ring-pink-400' : ''}
                `}
              >
                <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-gray-700 mb-4 line-clamp-2">{p.description || 'No description'}</p>
                <div className="flex flex-wrap gap-2">
                  {p.teamMembers.map((m, i) => (
                    <span key={i} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                      {m}
                    </span>
                  ))}
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={e => { e.stopPropagation(); updateProject(p._id); }}
                    className="text-yellow-500"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); deleteProject(p._id); }}
                    className="text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Drag-and-Drop Ticket Board */}
          {currentProject ? (
            <DndTicketsBoard project={currentProject} token={localStorage.getItem('token')} />
          ) : (
            <div className="text-center text-gray-600 mt-20 text-lg">
              Select a project to view tickets
            </div>
          )}

          {/* Create Project Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
              <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                  onClick={() => setShowModal(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-semibold text-center mb-6">Create New Project</h2>
                <form onSubmit={createProject} className="space-y-4">
                  <input
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                    value={newProject}
                    onChange={e => setNewProject(e.target.value)}
                    placeholder="Project Title"
                    required
                  />
                  <textarea
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                    rows={3}
                    value={newDescription}
                    onChange={e => setNewDescription(e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-400"
                    value={newTeamMembers}
                    onChange={e => setNewTeamMembers(e.target.value)}
                    placeholder="Team Members (comma-separated)"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-tr from-pink-500 to-purple-500 text-white rounded-2xl font-semibold shadow-md hover:scale-105 transition"
                  >
                    Create Project
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}