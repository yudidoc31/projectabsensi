import React from 'react';
import './styles.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="instagram-logo">
      <img src="nama_file_logo_universitas.png" alt="University Logo" />
        <span>University Nasional</span>
      </div>
      <div className="login-form">
        <form>
          <input type="text" placeholder="nim" />
          <input type="password" placeholder="password" />
          <button type="submit">Log In</button>
        </form>
      </div>
      <div className="forgot-password">
        <a href="#">Forgot password?</a>
      </div>
    </div>
  );
}

export default Login;
