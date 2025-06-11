import React, { useState } from 'react';

const TicketForm = ({ onCreate, teamMembers }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignee: "",
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onCreate(form);
    setForm({ title: "", description: "", priority: "Medium", assignee: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 p-5 rounded-2xl shadow-xl flex flex-col gap-3 animate-fade-in">
      <h3 className="text-lg font-bold text-blue-700 mb-2">Create New Ticket</h3>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows={2}
        className="border p-2 rounded"
      />
      <div className="flex gap-2">
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          name="assignee"
          value={form.assignee}
          onChange={handleChange}
          className="border p-2 rounded flex-1"
        >
          <option value="">Unassigned</option>
          {teamMembers && teamMembers.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <button type="submit" className="bg-gradient-to-tr from-fuchsia-600 to-blue-600 text-white rounded-lg py-2 font-bold shadow hover:scale-105 transition">
        Create Ticket
      </button>
    </form>
  );
};

export default TicketForm;
