import React, { useState } from 'react';

const Signup = () => {
  const [nim, setNim] = useState('');
  const [username, setUsername] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan validasi data dan permintaan ke server jika diperlukan
    // Contoh validasi sederhana hanya untuk ilustrasi
    if (nim && username && jurusan && password) {
      // Kirim data ke server atau lakukan tindakan lain
      console.log('Data berhasil disubmit');
    } else {
      setError('Semua kolom harus diisi');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="nim">NIM:</label>
        <input type="text" id="nim" value={nim} onChange={(e) => setNim(e.target.value)} required /><br />
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
        <label htmlFor="jurusan">Jurusan:</label>
        <input type="text" id="jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} required /><br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
