import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css"; // Importing our custom CSS file for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    try {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("username", username);
        navigate("/admin");
      } else {
        const response = await axios.post("http://localhost:3001/login", {
          username,
          password,
        });
        if (response.data.success) {
          localStorage.setItem("username", username);
          navigate("/edits");
        } else {
          setErrorMessage(
            response.data.message || "Invalid username or password."
          );
        }
      }

      // Assuming the response contains a success status and a redirect URL
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-page-container">
      <form className="login-page-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {errorMessage && (
          <div className="login-page-error-message">{errorMessage}</div>
        )}
        <div className="login-page-form-group">
          <label htmlFor="username" className="login-page-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="login-page-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-page-form-group">
          <label htmlFor="password" className="login-page-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="login-page-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-page-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
