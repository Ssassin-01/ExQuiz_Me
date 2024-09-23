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
    identity: "", // 학년 선택 필드 수정
    signupPurpose: "", // 가입목적 필드 수정
    gender: ""
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
      });

      if (response.ok) {
        console.log("Sign Up Successful");
        navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
      } else {
        const errorMessage = await response.text();
        alert(errorMessage); // 중복된 값에 대한 알림창 표시
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <div className="signup-container">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">이메일:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">패스워드:</label>
            <input type="password" id="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                   title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 to 20 characters"
                   value={userData.password} onChange={handleInputChange} required/>
          </div>
          <div className="form-group">
            <label htmlFor="nickname">닉네임:</label>
            <input
                type="text"
                id="nickname"
                name="nickname"
                value={userData.nickname}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className="form-group">
          <label htmlFor="telNumber">휴대번호:</label>
            <input
                type="tel"
                id="telNumber"
                name="telNumber"
                value={userData.telNumber}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">생일:</label>
            <input
                type="date"
                id="date"
                name="date"
                value={userData.date}
                onChange={handleInputChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">성별:</label>
            <select
                id="gender"
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                required
            >
              <option value="">Select...</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="identity">학년 선택:</label>
            <select
                id="identity"
                name="identity" // identity로 이름 변경
                value={userData.identity}
                onChange={handleInputChange}
                required
            >
              <option value="">Select...</option>
              <option value="elementary">초등학생</option>
              <option value="middle">중학생</option>
              <option value="high">고등학생</option>
              <option value="college">대학생</option>
              <option value="adult">어른</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="signupPurpose">가입목적:</label>
            <select
                id="signupPurpose"
                name="signupPurpose" // signupPurpose로 이름 변경
                value={userData.signupPurpose}
                onChange={handleInputChange}
                required
            >
              <option value="">Select...</option>
              <option value="elementary_vocabulary">초등영단어</option>
              <option value="middle_vocabulary">중등영단어</option>
              <option value="high_vocabulary">고등영단어</option>
              <option value="csat">수능</option>
              <option value="toeic">토익</option>
              <option value="toefl">토플</option>
            </select>
          </div>

          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
  );
};

export default SignUp;
