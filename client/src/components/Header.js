// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Header({ projects, currentProject, onSelect, breadcrumbs }) {
  return (
    <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm shadow-lg">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-gray-600 mb-4 lg:mb-0">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
            )}
            {crumb.to ? (
              <NavLink
                to={crumb.to}
                className={({ isActive }) =>
                  `hover:text-blue-600 transition ${
                    isActive ? 'text-blue-700 font-semibold' : ''
                  }`
                }
              >
                {crumb.label}
              </NavLink>
            ) : (
              <span className="text-gray-800 font-medium">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Project Selector */}
      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-semibold">Project:</span>
        <div className="relative">
          <select
            value={currentProject?._id || ''}
            onChange={e => onSelect(e.target.value)}
            className="appearance-none pr-8 pl-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">— Select project —</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
          <ChevronRightIcon className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90" />
        </div>
      </div>
    </header>
  );
}
