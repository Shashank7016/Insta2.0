const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route    PUT api/follow/:id
// @desc     Follow a user
// @access   Private
router.put('/follow/:id', auth, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (userToFollow.followers.some(follower => follower.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'You are already following this user' });
    }

    userToFollow.followers.push(req.user.id);
    currentUser.following.push(req.params.id);

    await userToFollow.save();
    await currentUser.save();

    res.json(currentUser.following); // Return updated following list
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/unfollow/:id
// @desc     Unfollow a user
// @access   Private
router.put('/unfollow/:id', auth, async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!userToUnfollow.followers.some(follower => follower.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'You are not following this user' });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (follower) => follower.toString() !== req.user.id
    );
    currentUser.following = currentUser.following.filter(
      (following) => following.toString() !== req.params.id
    );

    await userToUnfollow.save();
    await currentUser.save();

    res.json(currentUser.following); // Return updated following list
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
