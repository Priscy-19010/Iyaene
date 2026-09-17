const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("DNS:", dns.getServers());


const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()
const cors = require("cors");
const multer = require("multer");
const errorHandler = require('./middleware/errorHandler');
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174","https://uno-green-harvest.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());

// Routes

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quote', require('./routes/quoteRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(errorHandler);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });