const mongoose = require("mongoose");
const credentialSchema = new mongoose.Schema({
  username: String,
  password: String
});
const providerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  desc: String,
  credential: credentialSchema,
  status: String
}, {
  collection: "provider"
});
const Provider = mongoose.model("provider", providerSchema);
module.exports = Provider;