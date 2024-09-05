const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const role = require('../middleware/roleMiddleware');

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post('/register', authController.registerUser);
router.post('/invite', authController.inviteUser);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post('/login', authController.loginUser);

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, authController.getUser);

// @route    GET api/admin
// @desc     Admin only route
// @access   Private/Admin
router.get('/admin', auth, role(['admin']), (req, res) => {
  res.json({ msg: 'Welcome Admin' });
});

module.exports = router;
