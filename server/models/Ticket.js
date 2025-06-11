const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['todo', 'inprogress', 'done'], default: 'todo' },
  assignee: { type: String }, // store assignee's email or user id
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
