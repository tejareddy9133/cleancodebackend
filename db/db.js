const mongoose = require("mongoose");
// Require and configure dotenv at the top of your main file
require("dotenv").config();

// Access the URL from process.env
const mongoUrl = process.env.URL;

// Use the URL and port in your application

const connection = mongoose.connect(mongoUrl);

module.exports = { connection };
