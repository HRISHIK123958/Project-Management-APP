const express = require('express');
const Project = require('../models/Project');
const { sendInvitationEmail } = require('../emailService');

const router = express.Router();

// ✅ List all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch projects' });
  }
});

// ✅ Create new project with email invitations
router.post('/', async (req, res) => {
  const { title, description, teamMembers } = req.body;

  try {
    const project = await Project.create({ title, description, teamMembers });

    // Send invitation emails to each team member
    teamMembers.forEach(email => sendInvitationEmail(email, title));

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create project' });
  }
});

// ✅ Update project with conditional email invitations
router.put('/:id', async (req, res) => {
  try {
    const existingProject = await Project.findById(req.params.id);
    const previousMembers = existingProject.teamMembers;

    const { title, description, teamMembers } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, teamMembers },
      { new: true }
    );

    // Find new team members who weren't in the previous list
    const newMembers = teamMembers.filter(email => !previousMembers.includes(email));

    // Send invitations to new members only
    newMembers.forEach(email => sendInvitationEmail(email, title));

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: 'Unable to update project' });
  }
});

// ✅ Delete project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete project' });
  }
});

module.exports = router;
