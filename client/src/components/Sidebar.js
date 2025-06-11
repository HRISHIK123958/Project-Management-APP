import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ClipboardDocumentListIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', icon: HomeIcon, to: '/dashboard' },
  { name: 'Projects',  icon: ClipboardDocumentListIcon, to: '/projects' },
  { name: 'Settings',  icon: Cog6ToothIcon,       to: '/settings' },
];

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 bg-white shadow-lg
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300
        w-64 z-20
      `}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Issue Tracker</h2>
        <nav className="space-y-4">
          {navItems.map(({ name, icon: Icon, to }) => (
            <Link
              key={name}
              to={to}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
            >
              <Icon className="h-6 w-6" />
              <span className="font-medium">{name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
