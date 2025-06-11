// src/components/Header.js
import React from 'react';

export default function Header({ projects, currentProject, onSelect, breadcrumbs }) {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white shadow-md">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-500 mb-3 md:mb-0">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center">
            {i > 0 && <span className="mx-2">/</span>}
            {crumb.to
              ? <a href={crumb.to} className="hover:text-blue-600">{crumb.label}</a>
              : <span>{crumb.label}</span>
            }
          </span>
        ))}
      </nav>

      {/* Project Selector */}
      <div className="flex items-center gap-2">
        <label htmlFor="project" className="text-gray-600 font-medium">Project:</label>
        <select
          id="project"
          value={currentProject?._id || ''}
          onChange={e => onSelect(e.target.value)}
          className="border rounded p-2 bg-gray-50"
        >
          <option value="">Select a project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>{p.title}</option>
          ))}
        </select>
      </div>
    </header>
  );
}
