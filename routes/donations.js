const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Donation = require('../models/Donation');

// @route   GET api/donations
// @desc    Get all donations
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const donations = await Donation.find().populate('donor', ['name', 'email']);
    res.json(donations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/donations
// @desc    Add new donation
// @access  Private
router.post('/', auth, async (req, res) => {
  const { amount } = req.body;

  try {
    const newDonation = new Donation({
      amount,
      donor: req.user.id
    });

    const donation = await newDonation.save();
    res.json(donation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
