const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Question = require('./models/question.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/exam';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', async () => {
  console.log('MongoDB database connection established successfully.');

  // // Array of sample questions
  // const sampleQuestions = [
  //   {
  //     questionText: 'What is the process of converting data into a code to prevent unauthorized access called?',
  //     options: ['Decryption', 'Encryption', 'Encoding', 'Decoding'],
  //     correctAnswer: 1,
  //   },
  //   {
  //     questionText: 'Which planet is known as the "Red Planet"?',
  //     options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
  //     correctAnswer: 1,
  //   },
  //   {
  //     questionText: 'What is the chemical symbol for water?',
  //     options: ['W', 'O', 'H2O', 'WO'],
  //     correctAnswer: 2,
  //   },
  //   {
  //     questionText: 'What is the unit of electric current?',
  //     options: ['Volt', 'Ohm', 'Ampere', 'Watt'],
  //     correctAnswer: 2,
  //   },
  //   {
  //     questionText: 'Which scientist is known for the theory of general relativity?',
  //     options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Marie Curie'],
  //     correctAnswer: 1,
  //   },
  //   {
  //     questionText: 'What is the smallest unit of computer memory?',
  //     options: ['Byte', 'Bit', 'Kilobyte', 'Megabyte'],
  //     correctAnswer: 1,
  //   },
  //   {
  //     questionText: 'Who is the inventor of the World Wide Web (WWW)?',
  //     options: ['Bill Gates', 'Tim Berners-Lee', 'Steve Jobs', 'Mark Zuckerberg'],
  //     correctAnswer: 1,
  //   },
  //   {
  //     questionText: 'What is the process of combining two or more atoms to form a heavier nucleus called?',
  //     options: ['Fusion', 'Fission', 'Splitting', 'Nucleation'],
  //     correctAnswer: 0,
  //   },
  //   {
  //     questionText: 'Which programming language is widely used for web development and known for its ease of use?',
  //     options: ['Java', 'C++', 'Python', 'JavaScript'],
  //     correctAnswer: 3,
  //   },
  //   {
  //     questionText: 'What is the chemical symbol for gold?',
  //     options: ['Au', 'Ag', 'Fe', 'Cu'],
  //     correctAnswer: 0,
  //   },
  // ];

  // // Inserting the sample questions into the database
  
  // try {
  //   await Question.insertMany(sampleQuestions);
  //   console.log('Sample questions added to the database.');
  // } catch (error) {
  //   console.error('Error adding sample questions:', error);
  // }
});


// Routes
const questionsRouter = require('./routes/questions');
const responsesRouter = require('./routes/responses');

app.use('/questions', questionsRouter);
app.use('/responses', responsesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
