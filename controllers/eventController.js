const Event = require('../models/Event');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Utility function to save file to the event directory
const saveFileToEventDir = (file) => {
  const eventDir = path.join(__dirname, '../uploads/events');
  if (!fs.existsSync(eventDir)) {
    fs.mkdirSync(eventDir, { recursive: true });
  }
  const filePath = path.join(eventDir, Date.now() + '-' + file.originalname);
  fs.renameSync(file.path, filePath);
  return filePath;
};

// Middleware for handling file upload using Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/temp');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

exports.upload = multer({ storage: storage });

// Create an Event with banner
exports.createEvent = async (req, res) => {
  try {
    const { title, date, description, type, bannerUrl } = req.body;
    const bannerPath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!bannerPath && !bannerUrl) {
      return res.status(400).json({ message: 'Either bannerPath or bannerUrl is required.' });
    }

    const newEvent = new Event({
      title,
      date,
      description,
      type,
      bannerPath,
      bannerUrl: bannerUrl || null,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Update an Event
exports.updateEvent = async (req, res) => {
  try {
    let bannerPath = req.body.bannerPath;

    // Check if the banner is provided as a file or URL
    if (req.file) {
      bannerPath = `http://localhost:5000/uploads/events/${req.file.filename}`;
      saveFileToEventDir(req.file);  // Save the file to the event directory
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
      ...req.body,
      bannerPath
    }, { new: true });

    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event.', error });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events.', error });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event.', error });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event.', error });
  }
};
