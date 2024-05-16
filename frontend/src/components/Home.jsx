import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Universitas Nasional</h1>
      <p>This is the home page of the student attendance system.</p>
      <Link to="/login">
        <button className="btn">Get Started</button>
      </Link>
    </div>
  );
}

export default Home;
