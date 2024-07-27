const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get current user's profile
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const followerCount = user.followers.length;
    const followingCount = user.following.length;
    res.json({ ...user.toObject(), followerCount, followingCount });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get followers of a user
router.get('/:id/followers', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('followers', 'username');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get following of a user
router.get('/:id/following', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('following', 'username');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.following);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update current user's profile
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


// Get user profile by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
