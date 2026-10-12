const dns = require('dns');
const mongoose = require('mongoose');
const env = require('./env');

mongoose.connection.on('error', (err) => console.error('MongoDB error:', err.message));
mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));

const connectDB = async () => {
  // Only for networks whose DNS can't resolve MongoDB Atlas "mongodb+srv://" addresses.
  // Turn on with USE_GOOGLE_DNS=true in .env.
  if (env.useGoogleDns) dns.setServers(['8.8.8.8', '8.8.4.4']);

  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 10000 });
  console.log('MongoDB connected');
};

module.exports = connectDB;