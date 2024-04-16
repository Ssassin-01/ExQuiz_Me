import React from "react";
import "./css/signUp.css";

const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="signup-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <button type="button" className="check-button">
            Check
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
            required
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 to 20 characters"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordChk">Confirm Password:</label>
          <input type="password" id="passwordChk" name="passwordChk" required />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Nickname:</label>
          <input type="text" id="nickname" name="nickname" required />
        </div>
        <div className="form-group">
          <label htmlFor="tel_number">Telephone Number:</label>
          <input type="tel" id="tel_number" name="tel_number" required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date of Birth:</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" required>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="signup_purpose">Signup Purpose:</label>
          <select id="signup_purpose" name="signup_purpose" required>
            <option value="">Select...</option>
            <option value="elementary">Elementary English</option>
            <option value="middle">Middle School English</option>
            <option value="high">High School English</option>
            <option value="csat">CSAT</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
