import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useUser } from "../../User/UserContext";

const ProfileSection = ({ profileData }) => {
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const apiUrl = `${window.location.origin}`;

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("정말로 회원 탈퇴를 하시겠습니까?");
        if (confirmed) {
            try {
                await axios.delete(`${apiUrl}/api/user/${user.email}/delete`, {
                    withCredentials: true,
                });
                logout(); // 로그아웃 처리
                alert("회원 탈퇴가 완료되었습니다.");
                navigate('/'); // 메인 페이지로 이동
            } catch (error) {
                console.error("회원 탈퇴 실패:", error);
                alert("회원 탈퇴에 실패했습니다. 다시 시도해 주세요.");
            }
        }
    };

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
                        <hr/>
                        <div className="mypage-profile-extra">
                            <p>닉네임 | {profileData.nickname}</p>

                            <p>최근 활동 | 9월 21일 - 단어 10개 암기</p>
                        </div>
                    </div>
                    <div className="mypage-button-group">
                        <button className="mypage-edit-btn" onClick={() => navigate('/edit-profile')}>
                            수정
                        </button>
                        <button className="mypage-delete-btn" onClick={handleDeleteAccount}>
                            탈퇴
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
