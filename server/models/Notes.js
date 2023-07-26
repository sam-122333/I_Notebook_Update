const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userdata" },
  title: { type: String, require: true },
  description: { type: String, require: true },
  tag: { type: String, default: "general" },
  date: { type: Date, default: Date.now },
});

const Notes = mongoose.model("notes", notesSchema);

module.exports = Notes;
