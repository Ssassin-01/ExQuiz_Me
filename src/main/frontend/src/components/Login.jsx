import React from "react";
import { Link } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Not a member? <Link to="/signup">Register now</Link>
      </p>
    </div>
  );
};

export default Login;
