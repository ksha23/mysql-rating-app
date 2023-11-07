const express = require("express");
require("dotenv").config();
const ratingRoutes = require("./routes/RatingRouter");
const diningHallRoutes = require("./routes/DiningHallRouter");
const pool = require("./database.js");

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Use routes defined eslewhere
app.use("/api/ratings", ratingRoutes);
app.use("/api/diningHalls", diningHallRoutes);

// Database connection setup and server start in an async function
async function startServer() {
  try {
    pool.query("SELECT 1"); // Testing the database connection

    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to MySQL and listening on port ${process.env.PORT}`
      );
    });
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
  }
}

startServer();
