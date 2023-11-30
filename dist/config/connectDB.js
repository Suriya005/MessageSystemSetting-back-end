const mongoose = require("mongoose");
require("dotenv").config();
const remoteDbUri = process.env.MONGODB_URI;
mongoose.connect(remoteDbUri, {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 20000
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully to MongoDB");
});
module.exports = db;