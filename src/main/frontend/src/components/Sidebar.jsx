import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

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
    </div>
  );
};

export default Sidebar;
