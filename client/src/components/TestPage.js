import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/questions');
      setQuestions(response.data);
      setUserResponses(Array(response.data.length).fill({ questionId: '', selectedAnswer: '' }));
      console.log("All Questions Received");
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

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
    updatedResponses[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex]._id,
      selectedAnswer,
    };
    setUserResponses(updatedResponses);
    console.log("Option " + selectedAnswer + " Selected");
  };

  const submitResponses = async () => {
    try {
      const response = await axios.post('http://localhost:5000/responses', {
        userId: 'testUser123',
        responses: userResponses,
      });
      console.log('Responses submitted:', response.data);
      navigate('/result', { state: { score: response.data.score } });
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

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

  return (
    <div className="container mt-5">
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
            <div className="text-center mt-3 d-flex justify-content-between">
              <button
                className="btn btn-secondary btn-lg"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              {renderQuestionNumbersGrid()}
              {currentQuestionIndex === questions.length - 1 ? (
                <button className="btn btn-success btn-lg" onClick={submitResponses}>Submit</button>
              ) : (
                <button className="btn btn-primary btn-lg" onClick={handleNextQuestion}>Next</button>
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