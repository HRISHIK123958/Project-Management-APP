// routes/taskRoutes.js
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Get tasks for a project
router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params;
  console.log("Fetching tasks for projectId:", projectId);
  try {
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  console.log("Creating new task with data:", req.body);
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task status
router.put('/:id', async (req, res) => {
  console.log("Updating task status:", req.body);
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    console.error("❌ Error updating task:", err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

module.exports = router;
