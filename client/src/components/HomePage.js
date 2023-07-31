import React from 'react';
import { Link } from 'react-router-dom';
import examPortalImage from '../assets/mindsparkLogo2.png';

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <img
            src={examPortalImage} 
            alt="Exam Portal"
            className="img-fluid mb-4"
            style={{ maxWidth: '300px' }}
          />
          <h1 className="card-title">Welcome to the Exam Portal</h1>
          <p className="card-text">Prepare yourself for the upcoming test!</p>
          <Link to="/test" className="btn btn-primary">
            Start Test
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
