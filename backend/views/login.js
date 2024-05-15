import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan validasi login dan permintaan ke server jika diperlukan
    // Contoh validasi sederhana hanya untuk ilustrasi
    if (username === 'admin' && password === 'admin') {
      // Redirect atau lakukan tindakan lain setelah login berhasil
      console.log('Login berhasil');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
