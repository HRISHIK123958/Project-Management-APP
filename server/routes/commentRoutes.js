// server/routes/commentRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const { getComments, createComment } = require('../controllers/commentController');

const router = express.Router();

// GET comments for a ticket
router.get('/ticket/:ticketId', auth, getComments);

// POST a new comment
router.post('/', auth, createComment);

module.exports = router;
