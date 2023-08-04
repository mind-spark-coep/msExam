const express = require("express");
const router = express.Router();
const Question = require("../models/question");

// GET all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find({}, { correctAnswer: 0 });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new question
router.post("/", async (req, res) => {
  const question = new Question({
    questionText: req.body.questionText,
    options: req.body.options,
    correctAnswer: req.body.correctAnswer,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a question
router.put("/:id", async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        questionText: req.body.questionText,
        options: req.body.options,
        correctAnswer: req.body.correctAnswer,
      },
      { new: true }
    );
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a question
router.delete("/:id", async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    res.json(deletedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;