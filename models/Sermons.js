const mongoose = require('mongoose');

const SermonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speaker: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  file: { type: String },
  url: { type: String },
  fileType: { type: String },
});

module.exports = mongoose.model('Sermon', SermonSchema);
