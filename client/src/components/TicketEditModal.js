// src/components/TicketEditModal.jsx
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function TicketEditModal({
  isOpen,
  ticket,
  teamMembers,
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignee: ''
  });

  // whenever ticket changes, populate the form
  useEffect(() => {
    if (ticket) {
      setForm({
        title:       ticket.title,
        description: ticket.description,
        priority:    ticket.priority,
        assignee:    ticket.assignee || ''
      });
    }
  }, [ticket]);

  if (!isOpen || !ticket) return null;

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ ...form, id: ticket._id });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Ticket</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-gray-900" />
          </button>
        </header>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Assignee</label>
              <select
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              >
                <option value="">Unassigned</option>
                {teamMembers.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
