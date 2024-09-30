import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaHome, FaBookReader, FaFolderPlus, FaGamepad, FaDonate, FaIdCard, FaCog, FaBars } from 'react-icons/fa';
import logo from "../../images/logo.png";
import "./trash22/SideBar.css";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`sidebar ${isExpanded ? 'expand' : ''}`}>
            <div className="nav-header">
                <Link className="nav-header__link" to="/">
                    <img className="logo-img" src={logo} alt="logo" />
                    <p className="logo">ExQuiz me</p>
                </Link>
                <FaBars className="btn-menu" onClick={toggleSidebar} />
            </div>
            <ul className="nav-link">
                <li>
                    <Link to="/">
                        <FaHome className="icon"/>
                        <span className="title">Home</span>
                    </Link>
                    <span className="tooltip">Home</span>
                </li>
                <li>
                    <Link to="/study">
                        <FaBookReader className="icon"/>
                        <span className="title">Learning</span>
                    </Link>
                    <span className="tooltip">Learning</span>
                </li>
                <li>
                    <Link to="/make">
                        <FaFolderPlus className="icon"/>
                        <span className="title">Make</span>
                    </Link>
                    <span className="tooltip">Make</span>
                </li>
                <li>
                    <Link to="/game">
                        <FaGamepad className="icon"/>
                        <span className="title">Game</span>
                    </Link>
                    <span className="tooltip">Game</span>
                </li>
                <li>
                    <Link to="/subscribe">
                        <FaDonate className="icon"/>
                        <span className="title">SubScribe</span>
                    </Link>
                    <span className="tooltip">SubScribe</span>
                </li>
                <li>
                    <Link to="/mypage">
                        <FaIdCard className="icon"/>
                        <span className="title">MyPage</span>
                    </Link>
                    <span className="tooltip">MyPage</span>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;