require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const cors = require("cors")

const app = express();

// Allow requests from your frontend origin
app.use(cors({ origin: 'http://localhost:5173' })); 

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

const dbURI = process.env.MERN_URL;
const port = process.env.PORT || 4000;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log("Database connection error:", err));
