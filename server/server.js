// server/server.js
const path     = require('path');
const express  = require('express');
const cors     = require('cors');
const dotenv   = require('dotenv');
const mongoose = require('mongoose');

// 1) Load env vars
dotenv.config();

// 2) Import your routers
const userRoutes    = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes    = require('./routes/taskRoutes');
const ticketRoutes  = require('./routes/ticketRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// 3) Global middleware
app.use(cors());
app.use(express.json());

// 4) Health-check / root endpoint
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: '🚀 API is running!' });
});

// 5) Mount your API routes
app.use('/api/users',    userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks',    taskRoutes);
app.use('/api/tickets',  ticketRoutes);
app.use('/api/comments', commentRoutes);

// 6) (Optional) Serve React if you build it into server/client/build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// 7) Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 8) Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
