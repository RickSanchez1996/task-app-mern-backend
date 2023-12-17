const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoute");
const PORTS = process.env.PORT || 5000;
const cors = require("cors");
// Middleware
app.use(
  cors({
    origin: ["localhost:3000", "https://task-app-mern.onrender.com"],
  })
);
app.use(express.json(), express.urlencoded({ extended: false }), taskRoutes);

// Connect to DB then fire up the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORTS, () => {
      console.log(`Server running on on port ${PORTS}`);
    });
  })
  .catch((err) => console.log(err));
