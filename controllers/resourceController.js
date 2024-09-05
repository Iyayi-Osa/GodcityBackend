const path = require('path');
const multer = require('multer');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const Sermon = require('../models/Sermons');

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = file.mimetype.split('/')[0];
    let uploadPath = path.join(__dirname, '../uploads');

    if (fileType === 'audio') {
      uploadPath = path.join(uploadPath, 'audio');
    } else if (fileType === 'video') {
      uploadPath = path.join(uploadPath, 'video');
    }

    // Create the directory if it does not exist
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Upload Sermon Endpoint
const uploadSermon = async (req, res) => {
  const { title, speaker, date, description, url } = req.body;
  const filePath = req.file ? req.file.path : null;

  try {
    // Create a new sermon
    const sermon = new Sermon({
      title,
      speaker,
      date,
      description,
      file: filePath,
      url: url || null,
      fileType: req.file ? req.file.mimetype : null,
    });

    // Save the sermon to the database
    await sermon.save();

    res.status(200).json({ responseCode: 200, data: sermon });
  } catch (error) {
    console.error("Error uploading sermon:", error);
    res.status(500).json({ responseCode: 500, message: "Error uploading sermon" });
  }
};

// Update Sermon Endpoint
const updateSermon = async (req, res) => {
  const { id } = req.params;
  const { title, speaker, date, description, url } = req.body;
  const file = req.file;

  try {
    const sermon = await Sermon.findById(id);
    if (!sermon) {
      return res.status(404).json({ responseCode: 404, message: "Sermon not found" });
    }

    // If a new file is uploaded, handle the old file deletion and update the file path
    if (file) {
      // Delete the old file from the filesystem
      if (sermon.file) {
        fs.unlinkSync(sermon.file);
      }

      // Update file path
      sermon.file = file.path;
      sermon.fileType = file.mimetype;
    }

    // Update sermon details
    sermon.title = title || sermon.title;
    sermon.speaker = speaker || sermon.speaker;
    sermon.date = date || sermon.date;
    sermon.description = description || sermon.description;
    sermon.url = url || sermon.url;

    // Save updated sermon
    await sermon.save();

    res.status(200).json({ responseCode: 200, data: sermon });
  } catch (error) {
    console.error("Error updating sermon:", error);
    res.status(500).json({ responseCode: 500, message: "Error updating sermon" });
  }
};

const getAllSermons = async (req, res) => {
  try {
    const sermons = await Sermon.find();
    res.status(200).json({ responseCode: 200, data: sermons });
  } catch (error) {
    console.error("Error fetching sermons:", error);
    res.status(500).json({ responseCode: 500, message: "Error fetching sermons" });
  }
};

const getSermonDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const sermon = await Sermon.findById(id);
    if (!sermon) {
      return res.status(404).json({ responseCode: 404, message: "Sermon not found" });
    }

    res.status(200).json({ responseCode: 200, data: sermon });
  } catch (error) {
    console.error("Error fetching sermon details:", error);
    res.status(500).json({ responseCode: 500, message: "Error fetching sermon details" });
  }
};

// src/controllers/sermonController.js

const deleteSermon = async (req, res) => {
  const { id } = req.params;

  try {
    const sermon = await Sermon.findById(id);
    if (!sermon) {
      return res.status(404).json({ responseCode: 404, message: "Sermon not found" });
    }

    // Delete the file from the filesystem if it exists
    if (sermon.file) {
      fs.unlinkSync(sermon.file);
    }

    // Delete the sermon from the database
    await Sermon.findByIdAndDelete(id);

    res.status(200).json({ responseCode: 200, message: "Sermon deleted successfully" });
  } catch (error) {
    console.error("Error deleting sermon:", error);
    res.status(500).json({ responseCode: 500, message: "Error deleting sermon" });
  }
};


module.exports = {
  upload,
  uploadSermon,
  getAllSermons,
  getSermonDetails,
  deleteSermon,
  updateSermon
};
