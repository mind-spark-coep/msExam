const express = require("express");
const router = express.Router();
const User = require('../models/user.js');

// Get all registered users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { name: 1 }); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if user is registered
router.post("/check", async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findOne({ name });

    if (user) {
      res.status(200).json({ isRegistered: true });
    } else {
      res.status(200).json({ isRegistered: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
