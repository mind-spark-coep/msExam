const express = require('express');
const router = express.Router();
const UserResponse = require('../models/userResponse.js');
const Question = require('../models/question.js');

router.post('/', async (req, res) => {
  const { userID, responses, formData } = req.body;

  try {
    let score = 0;
    const questions = await Question.find();

    const userResponses = responses.map((response) => {
      const question = questions.find((q) => q._id.toString() === response.questionId);
      const selectedAnswerIndex = question.options.indexOf(response.selectedAnswer);
      const isCorrect = selectedAnswerIndex === question.correctAnswer;

      if (isCorrect) {
        score++; 
      }

      return {
        questionId: response.questionId,
        selectedAnswer: response.selectedAnswer,
        isCorrect,
      };
    });

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
