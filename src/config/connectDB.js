const mongoose = require("mongoose");

// URI การเชื่อมต่อกับ MongoDB Server นอก
const remoteDbUri =
  "mongodb+srv://suriya_p:GwcqRKwEnOifDRrq@dev.zzd5rac.mongodb.net/message";

mongoose.connect(remoteDbUri, {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 20000,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully to MongoDB");
});

module.exports = db;
