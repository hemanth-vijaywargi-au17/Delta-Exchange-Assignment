// Dependencies
const express = require("express");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const { resolve } = require("path");

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

// Statically Serving Build Folder
const buildFolderPath = resolve(__dirname, "../Front-End/delta-exchange-app/build");
app.use(express.static(buildFolderPath));

//React Router
app.get("*", (req, res) => {
  res.sendFile(`${buildFolderPath}/index.html`);
});

// Starting the Server
app.listen(PORT, () => {
  console.log(`Server Listening at PORT : ${PORT}`);
});
