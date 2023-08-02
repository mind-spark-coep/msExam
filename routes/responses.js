const express = require('express');
const router = express.Router();
const UserResponse = require('../models/userResponse.js');
const Question = require('../models/question.js');

router.post('/', async (req, res) => {
  const { userID, responses, formData, score } = req.body;

  try {
    const userResponses = responses.map((response) => ({
      questionId: response.questionId,
      selectedAnswer: response.selectedAnswer,
      isCorrect: response.isCorrect,
    }));

    const newUserResponse = new UserResponse({
      userID: userID,
      responses: userResponses,
      formData: formData,
      score: score,
    });

    const savedResponse = await newUserResponse.save();

    res.status(201).json(savedResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
