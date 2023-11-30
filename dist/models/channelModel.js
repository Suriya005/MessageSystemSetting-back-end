const mongoose = require("mongoose");
const channelSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  desc: String,
  providerId: Array,
  status: String
}, {
  collection: "msgChannel"
});
const Channel = mongoose.model("channel", channelSchema);
module.exports = Channel;