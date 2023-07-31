const express = require('express');
const router = express.Router();
const UserResponse = require('../models/userResponse.js');
const Question = require('../models/question.js');

router.post('/', async (req, res) => {
  const { userId, responses } = req.body;

  try {
    const userResponses = responses.map((response) => ({
      userId,
      questionId: response.questionId,
      selectedAnswer: response.selectedAnswer,
    }));
    
    const savedResponses = await UserResponse.insertMany(userResponses);

    res.status(201).json(savedResponses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
