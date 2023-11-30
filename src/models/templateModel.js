const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  subject: String,
  body: String,
});

const templateSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    desc: String,
    content: contentSchema,
    msgChannelId: mongoose.Schema.Types.ObjectId,
    status: String,
  },
  { collection: "msgTemplate" }
);


const Template = mongoose.model("template", templateSchema);

module.exports = Template;