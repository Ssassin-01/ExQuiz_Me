import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUserCircle, FaBook, FaPuzzlePiece, FaGamepad } from 'react-icons/fa'; // react-icons에서 아이콘 가져오기
import { Button } from "react-bootstrap";
import { useUser } from './User/UserContext';
import logo from "../images/logo.png";
import "./css/Header.css";

const Header = () => {
    const { user, login, logout } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    useEffect(() => {
        const email = sessionStorage.getItem('useremail');
        if (email && !user) {
            login(email);
        }

        if (user) {
            setProfileMenuOpen(false);
        }
    }, [user, login]);

    // 드롭다운 외의 영역 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".profile-container")) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/" className="logo-link">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <h1>ExQuiz Me</h1>
                </Link>
            </div>

            <div className="menu-icon">
                <FaBars onClick={toggleMenu} />
            </div>

            <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link to="/study" className="icon-link">
                            <FaBook className="nav-icon" />
                            <span className="nav-text">Learning</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/make" className="icon-link">
                            <FaPuzzlePiece className="nav-icon" />
                            <span className="nav-text">Make</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/game" className="icon-link">
                            <FaGamepad className="nav-icon" />
                            <span className="nav-text">Game</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="auth-buttons">
                {user ? (
                    <div className="profile-container">
                        <FaUserCircle className="profile-icon" onClick={toggleProfileMenu} />
                        {profileMenuOpen && (
                            <div className="profile-menu">
                                <ul>
                                    <li>
                                        <Link to="/mypage" onClick={() => setProfileMenuOpen(false)}>내 정보 보기</Link>
                                    </li>
                                    <li>
                                        <Link to="/subscribe" onClick={() => setProfileMenuOpen(false)}>구독하기</Link>
                                    </li>
                                    <li>
                                        <button onClick={logout}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login"><Button variant="outline-light">Login</Button></Link>
                        <Link to="/signup"><Button variant="outline-light">Sign Up</Button></Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
