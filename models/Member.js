
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    demographics: {
      type: String // Add more specific fields as needed (age, gender, etc.)
    },
    affiliation: {
      type: String // e.g., family, youth, ministry
    },
    dateJoined: {
      type: Date,
      default: Date.now
    }
  });
  

module.exports = mongoose.model('Member', MemberSchema);
