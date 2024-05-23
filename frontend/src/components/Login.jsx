import React, { useState } from 'react';
import axios from 'axios';
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [nim, setNIM] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    // if (!validator.isNIM(nim)) {
    //   alert("Invalid email");
    //   return false;
    // }
    if (!validator.isStrongPassword(password)) {
      alert(
        "Password must contain at least 8 characters."
      );
      return false
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { nim, password });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/absensi");
      };
    } catch (error) {
      console.error('Login error:', error);
      alert(`Login failed: ${error}`);
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
     <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-4">
            <form className="box">
              <h1 className="title is-2">Login</h1>
                <div className="field">
                  <label className="label">NIM</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={nim}
                      onChange={(e) => setNIM(e.target.value)}
                      placeholder="NIM"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="*******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    onClick={handleLogin}
                    type="submit"
                    className="btn btn-light btn-sm">
                    Login
                  </button>
                  <button type="button" className="btn btn-info-subtle btn-sm">
                    <Link to="/signup">Signup</Link>
                  </button>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
   

export default Login;
