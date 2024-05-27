import './styles.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

const Signup = () => {
  const [NIM, setNIM] = useState("")
  const [password, setPassword] = useState("")
  const [nama, setNama] = useState("")
  const [prodi, setProdi] = useState("")
  const [angkatan, setAngkatan] = useState("")
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (localStorage.getItem("token") != null) navigate(-1);
  }, []);

const validateForm = () => {
  if (!validator.isNumeric(NIM) && NIM == "") {
    alert("NIM cannot be empty and must be number only");
    return false;
  }
  if (!validator.isStrongPassword(password)) {
    alert("password must contain at least 8 character, including one uppercase letter, one lowercase letter, one number, and one special character."
    );
    return false;
  }
  if (nama === "") {
    alert("Nama cannot be empyt")
    return false;
  }
  return true;
};

const handleSignUp = async () => {
  if (!validateForm()) return;

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      { NIM, password, nama, prodi, angkatan }
    );

    if (response.status === 201) {
      alert("Signup successful!");
      navigate("/login");
      // window.location.href = "http://localhost:3000/login";
    }
  } catch (error) {
    alert(`error: ${message}`);
  }
};

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <input type="text" placeholder="NIM" value={NIM} onChange={(e) => setNIM(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
        <input type="text" placeholder="Prodi" value={prodi} onChange={(e) => setProdi(e.target.value)} />
        <input type="text" placeholder="Angkatan" value={angkatan} onChange={(e) => setAngkatan(e.target.value)}/>
       </form>

       <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSignUp}
        >Signup

        </button>
       </div>
    </div>
  );
}

export default Signup;
