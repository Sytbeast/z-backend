const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: String,
  designation: String,
  qualification: String,
  specialization: String,
  image: String
});

module.exports = mongoose.model("Faculty", facultySchema);
