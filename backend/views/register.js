import React from 'react';

const Signup = () => {
  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form action="/register" method="post">
        <div className="mb-3">
          <label htmlFor="NIM" className="form-label">NIM</label>
          <input type="text" className="form-control" id="fullname" name="fullname" required />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" required />
        </div>
        <div className="mb-3">
          <label htmlFor="jurusan" className="form-label">Jurusan</label>
          <input type="text" className="form-control" id="jurusan" name="jurusan" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
