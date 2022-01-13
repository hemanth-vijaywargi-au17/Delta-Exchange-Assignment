// Dependencies
const express = require("express");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

// Creating the express server
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Routes
app.use('/api/user',userRoutes)

// Database
require('./db').dbConnect()

// Starting the Server
app.listen(PORT, () => {
  console.log(`Server Listening at PORT : ${PORT}`);
});
