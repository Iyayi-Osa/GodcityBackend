const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const RequestSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4, // Generate a unique ID using uuidv4
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    default: "defaultUserId", // Default user ID if not provided
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatars: {
    type: [String], // Array of strings to store multiple avatars
    default: function() {
      return [this.defaultAvatar]; // Use default avatar if not provided
    },
  },
  image: {
    type: String,
    default: "defaultImagePath", // Default image if not provided
  },
  unit: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"], // Status can be one of these values
    default: "Pending", // Default status
  },
  attended: {
    type: Boolean,
    default: false, // Indicates if the request has been attended to
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt timestamps
});

module.exports = mongoose.model("Request", RequestSchema);
