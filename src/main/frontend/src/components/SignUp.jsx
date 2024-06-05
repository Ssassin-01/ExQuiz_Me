import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/signUp.css";

const SignUp = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    nickname: "",
    telNumber: "",
    date: "",
    gender: "",
    signupPurpose: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const genderValue = userData.gender === "male" ? 0 : userData.gender === "female" ? 1 : -1;
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await fetch(`${apiUrl}/joinProc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userData,
          gender: genderValue,
        }),
        credentials: 'include'
      });

      if (response.ok) {
        console.log("Sign Up Successful");
        navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
      } else {
        console.error("Sign Up Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 to 20 characters" value={userData.password} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="nickname">Nickname:</label>
            <input type="text" id="nickname" name="nickname" value={userData.nickname} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="telNumber">Telephone Number:</label>
            <input type="tel" id="telNumber" name="telNumber" value={userData.telNumber} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date of Birth:</label>
            <input type="date" id="date" name="date" value={userData.date} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={userData.gender} onChange={handleInputChange} required>
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="signupPurpose">Signup Purpose:</label>
            <select id="signupPurpose" name="signupPurpose" value={userData.signupPurpose} onChange={handleInputChange} required>
              <option value="">Select...</option>
              <option value="elementary">Elementary English</option>
              <option value="middle">Middle School English</option>
              <option value="high">High School English</option>
              <option value="csat">CSAT</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
  );
};

export default SignUp;
