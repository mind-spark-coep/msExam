import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import mindsparkName from '../assets/mindspark23.png';
import './TestPage.css';

function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [remainingTime, setRemainingTime] = useState(60 * 30); // 30 minutes in seconds
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state; // for ID

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/questions');
      console.log("Connection Established");
      setQuestions(response.data);
      setUserResponses(Array(response.data.length).fill({ questionId: '', selectedAnswer: '', isCorrect: false }));
      console.log("All Questions Received");
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      submitResponses();
      console.log("All responses submitted");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleOptionSelect = (selectedAnswer) => {
    const updatedResponses = [...userResponses];
    const question = questions[currentQuestionIndex];

    const selectedAnswerIndex = question.options.indexOf(selectedAnswer);

    const isCorrect = selectedAnswerIndex === question.correctAnswer;

    updatedResponses[currentQuestionIndex] = {
      questionId: question._id,
      selectedAnswer,
      isCorrect,
    };

    setUserResponses(updatedResponses);
  };

  const submitResponses = useCallback(async () => {
    try {
      let totalScore = 0;
      userResponses.forEach((response) => {
        if (response.isCorrect) {
          totalScore++;
        }
      });

      const response = await axios.post('http://localhost:5000/responses', {
        userID: name,
        responses: userResponses,
        score: totalScore,
        formData: location.state,
      });
      console.log('Responses submitted Successfully');
      navigate('/result', { state: { score: totalScore } });
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  }, [name, userResponses, location.state, navigate]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      submitResponses();
      console.log("Time's up! All responses submitted");
    }
  }, [remainingTime, submitResponses]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleQuestionNumberClick = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < questions.length) {
      setCurrentQuestionIndex(questionIndex);
    }
  };

  const renderQuestionNumbersGrid = () => {
    return (
      <div className="question-numbers-grid mt-4 mb-3">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`question-number btn btn-light ${currentQuestionIndex === index ? 'active' : ''}`}
            onClick={() => handleQuestionNumberClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="test-page-container">
      <div className="logo-container">
        <img className="mindspark-logo" src={mindsparkName} alt="Mindspark23" />
      </div>
      <div className="timer-container">
        <div className="timer-box">Time Remaining: {formatTime(remainingTime)}</div>
      </div>
      {currentQuestion ? (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Question {currentQuestionIndex + 1}</h2>
            <p className="card-text">{currentQuestion.questionText}</p>
            <ul className="list-group">
              {currentQuestion.options.map((option, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={() => handleOptionSelect(option)}
                >
                  <button
                    className={`btn btn-transparent ${userResponses[currentQuestionIndex]?.selectedAnswer === option ? 'selected' : ''}`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            <div className="text-center mt-3 d-flex justify-content-between nav-div">
              <button
                className="btn btn-secondary btn-lg navibutton"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              {renderQuestionNumbersGrid()}
              {currentQuestionIndex === questions.length - 1 ? (
                <button className="btn btn-success btn-lg navibutton" onClick={submitResponses}>Submit</button>
              ) : (
                <button className="btn btn-primary btn-lg navibutton" onClick={handleNextQuestion}>Next</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TestPage;
