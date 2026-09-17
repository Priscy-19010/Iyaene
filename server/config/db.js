const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const db = require("./db");
const cors = require("cors");


app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
  })
);

mongoose.connect (""); 