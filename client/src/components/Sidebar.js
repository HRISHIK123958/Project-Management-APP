// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', icon: HomeIcon, to: '/dashboard' },
  { name: 'Projects',  icon: ClipboardDocumentListIcon, to: '/projects' },
  { name: 'Settings',  icon: Cog6ToothIcon,       to: '/settings' },
];

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300 z-20
        w-64 bg-gradient-to-br from-purple-700 to-blue-500 text-white shadow-2xl
      `}
    >
      {/* User / Brand Header */}
      <div className="px-6 py-8 flex items-center gap-3 border-b border-white/20">
        <UserCircleIcon className="h-10 w-10 text-white/80" />
        <div>
          <h1 className="text-xl font-bold leading-none">Issue Tracker</h1>
          <p className="text-sm text-white/80">v1.0.0</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-2">
        {navItems.map(({ name, icon: Icon, to }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
               ${isActive
                 ? 'bg-white/20 text-white font-semibold'
                 : 'text-white/90 hover:bg-white/10 hover:text-white'}`
            }
          >
            <Icon className="h-6 w-6" />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Collapse Hint */}
      <div className="mt-auto px-6 py-4 text-xs text-white/60">
        <p>Tip: press <kbd className="px-1 bg-white/20 rounded">Ctrl+B</kbd> to toggle</p>
      </div>
    </aside>
  );
}
