// server/controllers/ticketController.js
const Ticket = require('../models/Ticket');

// GET /api/tickets/project/:projectId
exports.getTicketsByProject = async (req, res) => {
  const { projectId } = req.params;
  const { status, priority, assignee, search } = req.query;

  // Build filter
  const filter = { projectId };
  if (status && status !== 'all')     filter.status   = status;
  if (priority && priority !== 'all') filter.priority = priority;
  if (assignee && assignee !== 'all') filter.assignee = assignee;
  if (search) {
    filter.$or = [
      { title:       new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') }
    ];
  }

  try {
    const tickets = await Ticket.find(filter).sort('createdAt');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
