import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useauth } from '../hooks/useauth';

const Register = () => {
  const navigate = useNavigate();
  const { handleregister, loading } = useauth();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleregister({ username, email, password });
      navigate("/login"); // redirect after success
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main>
      <h1 className='t'>Auth-System</h1>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="enter your username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="enter your email id"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          <button className="button primary-button">Register</button>
        </form>

        <p>
          already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;