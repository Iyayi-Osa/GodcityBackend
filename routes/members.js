const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Member = require('../models/Member');

// @route   GET api/members
// @desc    Get all members
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/members
// @desc    Add new member
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const newMember = new Member({
      name,
      email,
      phone,
      address
    });

    const member = await newMember.save();
    res.json(member);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
