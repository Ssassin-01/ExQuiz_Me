import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { Button } from "react-bootstrap";
import { useUser } from './User/UserContext';
import logo from "../images/logo.png"; // 로고 이미지 추가
import "./css/Header.css";

const Header = () => {
    const { user, login, logout } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const email = sessionStorage.getItem('useremail');
        if (email && !user) {
            login(email);
        }
    }, [user, login]);

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
                    <li><Link to="/study">Learning</Link></li>
                    <li><Link to="/make">Make</Link></li> {/* Make 메뉴 추가 */}
                    <li><Link to="/game">Game</Link></li>
                    <li><Link to="/subscribe">Subscribe</Link></li> {/* SubScribe 메뉴 추가 */}
                    <li><Link to="/mypage">MyPage</Link></li>
                </ul>
            </nav>

            <div className="auth-buttons">
                {user ? (
                    <>
                        <span className="user-email">{user.email}</span>
                        <Button variant="outline-light" onClick={logout}>Logout</Button>
                    </>
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
