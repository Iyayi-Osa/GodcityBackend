const express = require('express');
const multer = require('multer');
const resourceController = require('../controllers/resourceController');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});

// Route to upload a document
router.post('/upload', upload.single('file'), resourceController.uploadDocument);

module.exports = router;
