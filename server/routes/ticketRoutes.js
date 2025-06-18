// server/routes/ticketRoutes.js
const express = require('express');
const Ticket = require('../models/Ticket');
const auth   = require('../middleware/auth');

const router = express.Router();

// ── Create a new ticket ──
// POST /api/tickets
router.post('/', auth, async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── List tickets for a project, with filtering & search ──
// GET /api/tickets/project/:projectId?status=&priority=&assignee=&search=
router.get('/project/:projectId', auth, async (req, res) => {
  const { projectId } = req.params;
  const { status, priority, assignee, search } = req.query;

  // Build our Mongo filter
  const filter = { projectId };
  if (status   && status   !== 'all') filter.status   = status;
  if (priority && priority !== 'all') filter.priority = priority;
  if (assignee && assignee !== 'all') filter.assignee = assignee;
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ title: re }, { description: re }];
  }

  try {
    const tickets = await Ticket
      .find(filter)
      .sort('createdAt');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Update any ticket field (including status) ──
// PUT /api/tickets/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── Assign a ticket ──
// PUT /api/tickets/:id/assign
router.put('/:id/assign', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignee: req.body.assignee },
      { new: true, runValidators: true }
    );
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── Delete a ticket ──
// DELETE /api/tickets/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;