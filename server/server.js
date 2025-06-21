// server/server.js
const express  = require('express');
const cors     = require('cors');
const dotenv   = require('dotenv');
const mongoose = require('mongoose');

// Load .env into process.env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 1) Import your routers
const userRoutes    = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes    = require('./routes/taskRoutes');
const ticketRoutes  = require('./routes/ticketRoutes');
const commentRoutes = require('./routes/commentRoutes');

// 2) Mount them under /api/…
app.use('/api/users',    userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks',    taskRoutes);
app.use('/api/tickets',  ticketRoutes);
app.use('/api/comments', commentRoutes);

// 3) Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 4) Start your server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
