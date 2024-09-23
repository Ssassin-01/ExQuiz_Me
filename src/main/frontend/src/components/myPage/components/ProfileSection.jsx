// components/ProfileSection.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";

const ProfileSection = ({ profileData }) => {
    const navigate = useNavigate();

    return (
        <div className="mypage-profile">
            <h3>내 프로필</h3>
            <div className="mypage-profile-content">
                <div className="mypage-profile-details">
                    <div className="mypage-profile-img">
                        <span role="img" aria-label="profile" className="mypage-emoji">👤</span>
                    </div>
                    <div className="mypage-profile-info">
                        <p className="mypage-nickname">{profileData.nickname}</p> {/* 닉네임 출력 */}
                        <p className="mypage-email">{profileData.email}</p>
                        <hr />
                        <div className="mypage-profile-extra">
                            <p>닉네임 | {profileData.nickname}</p>
                            <p>목표 | {profileData.oneLineResolution}</p>
                            <p>최근 활동 | 9월 21일 - 단어 10개 암기</p>
                        </div>
                    </div>
                    <button className="mypage-edit-btn" onClick={() => navigate('/edit-profile')}>
                        수정
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
