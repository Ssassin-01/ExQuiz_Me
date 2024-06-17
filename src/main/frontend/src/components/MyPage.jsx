import React from 'react';
import './css/MyPage.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {Tab, Tabs} from "react-bootstrap";
import {SlBadge} from "react-icons/sl";

const MyPage = () => {
    return (
        <div>
            <div className="my-page">
                <div className="myProfile">
                    <header className="my-page-header">
                        <span>My Page</span>
                        <button className="settings-button">⚙️</button>
                    </header>
                    <div className="UsingFlex">
                        <div className="profile-section">
                            <div className="profile-details">
                                <div className="profile-image"></div>
                                <div className="profile-content">
                                    <h2>ABC</h2>
                                    <p>ABC@gmail.com</p>
                                </div>
                                <button className="edit-button">수정</button>
                            </div>
                            <div className="profile-contents">
                                <p>아자아자!!</p>
                                <p>ABC@gmail.com</p>
                                <p>ABC@gmail.com</p>
                                <p>ABC@gmail.com</p>
                            </div>
                        </div>
                        <div className="MyCalendar">
                            <Calendar/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sub-my-page">
                <Tabs defaultActiveKey="badge" id="fill-tab-example" className="mb-3" fill>
                    <Tab eventKey="badge" title="내 뱃지">
                        <div className="tab-content">
                            <div className="BadgesObject">
                                <div className="myBadges">
                                    <SlBadge size="70"/>
                                    <p>뱃지이름</p>
                                    <p>받은 날짜</p>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="Recent" title="최근 학습">
                        <div className="tab-content">
                            최근학습
                        </div>
                    </Tab>
                    <Tab eventKey="replay" title="다시 보기">
                        <div className="tab-content">
                            다시보기
                        </div>
                    </Tab>
                    <Tab eventKey="learning" title="내 학습">
                        <div className="tab-content">
                            내학습
                        </div>
                    </Tab>
                </Tabs>
                <div className="navigation">
                    <button className="nav-button">내 배치</button>
                    <button className="nav-button">최근 학습</button>
                    <button className="nav-button">캐릭터</button>
                    <button className="nav-button">내 학습세트</button>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
