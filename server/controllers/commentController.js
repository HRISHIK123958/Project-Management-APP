// server/controllers/commentController.js
const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ ticketId: req.params.ticketId })
      .sort('createdAt')
      .populate('userId', 'name'); // pull user's name
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = async (req, res) => {
  const { ticketId, text } = req.body;
  const userId = req.user.id; // assuming auth middleware sets req.user
  try {
    const comment = await Comment.create({ ticketId, userId, text });
    await comment.populate('userId', 'name');
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
