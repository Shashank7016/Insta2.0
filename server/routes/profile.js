const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
  const { username, email } = req.body;
  const profileFields = {};
  if (username) profileFields.username = username;
  if (email) profileFields.email = email;

  try {
    let user = await User.findById(req.user.id);
    if (user) {
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: profileFields },
        { new: true }
      );
      return res.json(user);
    }
    res.status(404).json({ msg: 'User not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
