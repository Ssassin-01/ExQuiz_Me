import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import "./css/EditProfile.css";

const EditProfile = () => {
    const [userData, setUserData] = useState({
        email: "",
        nickname: "",
        telNumber: "",
        date: "",
        identity: "",
        signupPurpose: "",
        gender: ""
    });
    const { user } = useUser(); // 로그인된 사용자 정보 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user && user.email) {
                try {
                    const apiUrl = process.env.REACT_APP_API_URL;
                    const response = await fetch(`${apiUrl}/api/user/profile/${user.email}`);
                    const contentType = response.headers.get("content-type");

                    // 응답이 JSON인지 확인
                    if (!contentType || !contentType.includes("application/json")) {
                        throw new Error("Received non-JSON response");
                    }

                    if (response.ok) {
                        const profileData = await response.json();
                        setUserData({
                            email: profileData.email,
                            nickname: profileData.nickname,
                            telNumber: profileData.telNumber,
                            date: profileData.date,
                            identity: profileData.identity, // 학년 선택 값
                            signupPurpose: profileData.signupPurpose, // 가입목적 값
                            gender: profileData.gender === 0 ? "male" : "female"
                        });
                    } else {
                        console.error("Failed to fetch user profile. Status:", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, [user]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const genderValue = userData.gender === "male" ? 0 : userData.gender === "female" ? 1 : -1;
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/user/updateProfile`, {
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
                console.log("Profile updated successfully");
                navigate("/mypage");
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>회원정보 수정</h2>
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        readOnly // 이메일 수정 불가
                        className="readonly-input"
                    />
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
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="identity">학년 선택:</label>
                    <select
                        id="identity"
                        name="identity"
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
                        name="signupPurpose"
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
                <button type="submit" className="submit-button">프로필 수정</button>
            </form>
        </div>
    );
};

export default EditProfile;
