import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") != null) navigate(-1);
  }, []);

  return (
    <Container className="mt-5 text-center">
      <h1>Welcome to Universitas Nasional</h1>
      <p className="mt-3">This is the home page of the student attendance system.</p>
      <Link to="/admin-login">
        <Button variant="primary" className="mt-3">Login as Admin/Dosen</Button>
      </Link>
      <Link to="/login">
        <Button variant="primary" className="mt-3">Login as Mahasiswa</Button>
      </Link>
    </Container>
  );
}

export default Home;
