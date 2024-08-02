const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// @route    GET api/explore
// @desc     Get random or popular posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    // Example: Fetch random posts
    const posts = await Post.aggregate([{ $sample: { size: 10 } }]);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
