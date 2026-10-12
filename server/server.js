// Must be first: loads .env and stops the process if the configuration is invalid
const env = require('./config/env');

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const app = require('./app');

const start = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // don't sit there "running" without a database
  }

  const server = app.listen(env.port, () => {
    console.log(`Server running on port ${env.port} (${env.nodeEnv})`);
  });

  // Finish in-flight requests and close the DB before exiting (Ctrl+C or a host restart)
  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down...`);
    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref(); // give up after 10s
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

start();