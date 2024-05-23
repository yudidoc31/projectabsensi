import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to Universitas Nasional</h1>
      <p className="mt-3">This is the home page of the student attendance system.</p>
      <Link to="/login">
        <Button variant="primary" className="mt-3">Get Started</Button>
      </Link>
    </Container>
  );
}

export default Home;
