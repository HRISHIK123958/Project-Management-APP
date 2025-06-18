const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  teamMembers: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);