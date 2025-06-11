import React from 'react';

// Small avatar generator
const Avatar = ({ name }) => (
  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-300 text-white text-xs font-bold">
    {name ? name[0].toUpperCase() : "?"}
  </span>
);

const TicketsList = ({ tickets, teamMembers, onStatusChange }) => (
  <div className="mt-6 grid gap-4">
    {tickets.length === 0 && (
      <div className="text-center text-gray-400 italic">No tickets yet.</div>
    )}
    {tickets.map(ticket => (
      <div key={ticket._id} className="bg-white/90 rounded-xl shadow-lg p-5 flex flex-col animate-pop-in">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-fuchsia-700">{ticket.title}</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ticket.priority === 'High' ? 'bg-red-200 text-red-700' : ticket.priority === 'Low' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>
            {ticket.priority}
          </span>
        </div>
        <p className="mb-2 text-xs text-gray-600">{ticket.description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Avatar name={ticket.assignee} />
            {ticket.assignee || "Unassigned"}
          </span>
          <span>Status: <b className="capitalize">{ticket.status}</b></span>
          <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex gap-2 mt-2">
          {['todo', 'inprogress', 'done'].filter(s => s !== ticket.status).map(s => (
            <button
              key={s}
              onClick={() => onStatusChange(ticket._id, s)}
              className="px-2 py-1 text-xs rounded bg-blue-100 hover:bg-blue-200 font-semibold transition"
            >
              Move to {s}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default TicketsList;
