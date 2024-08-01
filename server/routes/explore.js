const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route    GET api/explore/posts
// @desc     Get popular posts
// @access   Private
router.get('/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 }).limit(10);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/explore/users
// @desc     Get popular users
// @access   Private
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().sort({ followerCount: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/explore/search
// @desc     Search posts and users
// @access   Private
router.get('/search', auth, async (req, res) => {
  const { query } = req.query;
  try {
    const posts = await Post.find({ text: { $regex: query, $options: 'i' } });
    const users = await User.find({ username: { $regex: query, $options: 'i' } });
    res.json({ posts, users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
