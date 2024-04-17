import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import {Modal, Button} from 'react-bootstrap';

const Sidebar = () => {
  return (
      <div className="sidebar">
        <a className="side_head" href="#">
          <img className="logo-img" src={logo} alt="logo"/>
          <p className="logo">ExQuiz me</p>
        </a>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/study">Study</Link>
          </li>
          <li>
            <Link to="/make">Make</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <div className="modal show"
             style={{display: 'block', position: 'initial', color: 'white'}}>
          <Modal.Dialog>
            <Modal.Header style={{backgroundColor: '#6c8776', color: 'white'}}>
              <Modal.Title>내 라이브러리</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{backgroundColor: '#6c8776'}}>
              <p>학습세트를 공유해보아요</p>
            </Modal.Body>

            <Modal.Footer style={{backgroundColor: '#6c8776'}}>
              <Button variant="secondary">Make Card</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
        <div>
        </div>
      </div>
  );
};

export default Sidebar;
