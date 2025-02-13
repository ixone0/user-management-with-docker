import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 
  const [fadeIn, setFadeIn] = useState(false); // สเตทสำหรับ fade-in
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      setFadeIn(true);
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
      });
      setMessage("User registered successfully!");
      setMessageType("success");
      setFadeIn(true);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Error registering user.");
      setMessageType("error");
      setFadeIn(true);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h1>Register</h1>
        <div>
          Name: 
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          Email: 
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          Password: 
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          Confirm password: 
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && (
          <p className={`message ${messageType} ${fadeIn ? "fade-in" : ""}`}>{message}</p>
        )}
        <button type="submit" className="button-register">Register</button>
        <div className="button-container">
          <button type="button" className="button-login" onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;