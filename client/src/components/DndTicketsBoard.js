// src/components/DndTicketsBoard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  DragDropContext,
  Droppable,
  Draggable
} from 'react-beautiful-dnd';
import TicketForm from './TicketForm';
import CommentsSection from './CommentsSection';

const statusOrder = ['todo', 'inprogress', 'done'];
const statusLabels = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done'
};

export default function DndTicketsBoard({ project }) {
  const navigate = useNavigate();
  const [columns, setColumns] = useState({ todo: [], inprogress: [], done: [] });

  // Bucket tickets by status
  const bucketTickets = tickets => {
    const b = { todo: [], inprogress: [], done: [] };
    tickets.forEach(t => {
      if (b[t.status]) b[t.status].push(t);
    });
    setColumns(b);
  };

  // Fetch tickets
  const fetchTickets = async () => {
    if (!project) return;
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/tickets/project/${project._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      bucketTickets(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error('Fetch tickets failed', err);
      }
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [project]);

  // Drag-and-drop handler
  const onDragEnd = async result => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const newStatus = destination.droppableId;
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    // Optimistic UI update
    const moved = columns[source.droppableId].find(t => t._id === draggableId);
    setColumns(cols => {
      const src = Array.from(cols[source.droppableId]);
      src.splice(source.index, 1);
      const dest = Array.from(cols[newStatus]);
      dest.splice(destination.index, 0, moved);
      return { ...cols, [source.droppableId]: src, [newStatus]: dest };
    });

    // Persist
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tickets/${draggableId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Save status failed', err);
      fetchTickets(); // revert
    }
  };

  // Create ticket handler
  const handleCreate = async data => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/tickets`,
        { ...data, projectId: project._id, status: 'todo' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTickets();
    } catch (err) {
      console.error('Create ticket failed', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{project.title} — Kanban</h2>

      {/* Ticket creation form */}
      <TicketForm onCreate={handleCreate} teamMembers={project.teamMembers} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {statusOrder.map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-xl shadow-lg bg-white transition-colors
                    ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                >
                  <h3 className="text-xl font-semibold mb-3">{statusLabels[status]}</h3>
                  {columns[status].map((ticket, idx) => (
                    <Draggable key={ticket._id} draggableId={ticket._id} index={idx}>
                      {(prov, snap) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          className={`mb-3 p-3 bg-gray-100 rounded-lg shadow-sm transition-transform
                            ${snap.isDragging ? 'scale-105 bg-gray-200' : ''}`}
                        >
                          <h4 className="font-medium">{ticket.title}</h4>
                          <p className="text-xs text-gray-600">{ticket.priority}</p>

                          {/* Comments */}
                          <CommentsSection
                            ticketId={ticket._id}
                            token={localStorage.getItem('token')}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
