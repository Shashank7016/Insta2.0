const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const Story = require('../models/Story');
const User = require('../models/User');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// @route    POST api/stories
// @desc     Upload a new story
// @access   Private
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const newStory = new Story({
      user: req.user.id,
      imageUrl: req.file.path
    });

    const story = await newStory.save();
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/stories
// @desc     Get all stories of followed users
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('following', 'id');
    const stories = await Story.find({
      user: { $in: user.following }
    }).sort({ createdAt: -1 }).populate('user', 'username');

    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
