const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Configure CORS
app.use(cors());

// Import routes
const dialogflowRoutes = require('./routes/dialogflow');
const apiRoutes = require('./routes/api');

app.use('/events', express.static(path.join(__dirname, 'uploads/event')));

// Use routes
app.use('/dialogflow', dialogflowRoutes);
app.use('/api', apiRoutes);

// Additional routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/members', require('./routes/members'));
app.use('/api/events', require('./routes/events'));
app.use('/api/donations', require('./routes/donations'));
// app.use('/api/chatbot', require('./routes/chatbot'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
