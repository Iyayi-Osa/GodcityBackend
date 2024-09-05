const mongoose = require('mongoose');

const FinancialTransactionSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true
    },
    category: {
      type: String // e.g., tithe, offering, donation, expense type
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
  