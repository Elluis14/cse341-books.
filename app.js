import express from "express";

const app = express();

// Middleware to process JSON requests
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the CSE 341 Books API",
    status: "success",
  });
});

// Export the Express application
export default app;
