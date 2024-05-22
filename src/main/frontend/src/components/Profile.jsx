import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './css/Profile.css';
import { Tab, Tabs } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  return (
    <>
      <div className="myPage">
        <div className="profile">
          <div className="userImg">
            <CgProfile size="60" />
          </div>
          <div className="userDetail">
            <h2>ABC</h2>
            <p>ABC@gmail.com</p>
          </div>
          <div>
            <button>수정</button>
          </div>
          <div>
            <hr />
            <p>목적 : 수능</p>
            <p>좌우명 : 아자아자</p>
          </div>
        </div>
        <div className="calendar">
          <Calendar />
        </div>
      </div>
      <div className="content_area">
        <Tabs defaultActiveKey="badge" id="fill-tab-example" className="mb-3" fill>
          <Tab eventKey="badge" title="내 뱃지">
            <div className="tab-content">
              뱃지칸
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
      </div>
    </>
  );
}

export default Profile;
