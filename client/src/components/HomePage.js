import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import examPortalImage from '../assets/mindsparkLogo2.png';
import { RiEyeLine } from 'react-icons/ri';
import './HomePage.css';

function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    standard: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isUserInfoProvided = () => {
    const { name, school, standard, email, password } = formData;
    return name !== '' && school !== '' && standard !== '' && email !== '' && password !== '';
  };

  const handleStartTest = () => {
    if (isUserInfoProvided()) {
      console.log(formData);
      navigate('/test', { state: formData });
    } else {
      alert('Please fill in all the fields before starting the test.');
    }
  };

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
          <div className="mt-4">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="school"
                value={formData.school}
                placeholder="School/College Name"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="standard"
                value={formData.standard}
                placeholder="Standard/Year"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                placeholder="Password"
                className="form-control"
                onChange={handleChange}
              />
              <span
                className={`password-toggle-icon ${showPassword ? 'visible' : ''}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <RiEyeLine />
              </span>
            </div>
          </div>
          {isUserInfoProvided() ? (
            <button className="btn btn-primary" onClick={handleStartTest}>
              Start Test
            </button>
          ) : (
            <button className="btn btn-primary" disabled>
              Start Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
