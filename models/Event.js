const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  bannerPath: { type: String, required: function() { return !this.bannerUrl; } },
  bannerUrl: { type: String, required: function() { return !this.bannerPath; } }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
