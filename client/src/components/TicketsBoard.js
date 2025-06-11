import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketForm from './TicketForm';
import TicketsList from './TicketList';

const TicketsBoard = ({ project, token }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tickets for this project
  const fetchTickets = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/tickets/project/${project._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTickets(res.data);
    setLoading(false);
  };

  useEffect(() => { if (project) fetchTickets(); }, [project]);

  // Create
  const handleCreate = async (ticketData) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/tickets`, { ...ticketData, projectId: project._id }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTickets();
  };

  // Change status
  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/tickets/${id}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTickets();
  };

  return (
    <div className="max-w-4xl mx-auto my-10">
      <TicketForm onCreate={handleCreate} teamMembers={project.teamMembers} />
      {loading ? (
        <div className="text-center py-8">Loading tickets…</div>
      ) : (
        <TicketsList tickets={tickets} teamMembers={project.teamMembers} onStatusChange={handleStatusChange} />
      )}
    </div>
  );
};

export default TicketsBoard;
