const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedAnswer: {
    type: String,
    required: true,
  },
});

const UserResponse = mongoose.model(
  "UserResponse",
  userResponseSchema,
  "ExamPortal"
);

module.exports = UserResponse;
