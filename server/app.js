const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const env = require('./config/env');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Only trust X-Forwarded-For when you really are behind a proxy (see TRUST_PROXY in .env.example)
app.set('trust proxy', env.trustProxy || false);

// Security headers. cross-origin lets your frontend display images served from /uploads.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(cors({ origin: env.clientUrls, credentials: true }));
app.use(express.json({ limit: '100kb' }));

// Hosting platforms ping this to know the server is alive
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', db: mongoose.connection.readyState === 1 });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quote', require('./routes/quoteRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Nothing above matched
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;