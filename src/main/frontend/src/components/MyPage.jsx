import React from 'react';
import './css/MyPage.css';

const MyPage = () => {
  return (
      <div className="my-page">
        <header className="my-page-header">
          <h1>My Page</h1>
          <button className="settings-button">⚙️</button>
        </header>
        <div className="profile-section">
          <div className="profile-details">
            <div className="profile-image"></div>
            <h2>ABC</h2>
            <p>ABC@gmail.com</p>
            <button className="edit-button">수정</button>
          </div>
          <div className="profile-emails">
            <p>ABC@gmail.com</p>
            <p>ABC@gmail.com</p>
            <p>ABC@gmail.com</p>
            <p>ABC@gmail.com</p>
          </div>
        </div>
        <div className="navigation">
          <button className="nav-button">내 배치</button>
          <button className="nav-button">최근 학습</button>
          <button className="nav-button">캐릭터</button>
          <button className="nav-button">내 학습세트</button>
        </div>
      </div>
  );
};

export default MyPage;
