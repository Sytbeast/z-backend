const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  file: String,
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
