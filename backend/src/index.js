const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const taskRoutes = require("./routes/taskRoute");

const { config } = require("dotenv");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

config(); // load environment variables from .env file

const app = express(); // initialize Express app

// middleware setup
app.use(cookieParser()); // parse cookies
app.use(express.json()); // parse application/json

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// error handling middleware (this should be the last middleware)
app.use(notFound);
app.use(errorHandler);

// serving frontend if in production mode
const PORT = process.env.PORT || 5000;

// start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
