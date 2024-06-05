import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useUser } from './User/UserContext';
import "./css/Header.css";

const Header = () => {
    const navigate = useNavigate();
    const { user, login, logout } = useUser();  // login 함수 추가

    useEffect(() => {
        const email = sessionStorage.getItem('useremail');
        if (email && !user) {
            login(email);
        }
    }, [user, login]);  // user와 login을 의존성 배열에 추가

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="header">
            {user ? (
                <>
                    <div className="me-2">{user.email}</div>
                    <Button variant="outline-light" onClick={handleLogoutClick}>Logout</Button>{' '}
                </>
            ) : (
                <div className="login-signup-buttons">
                    <Button variant="outline-light" onClick={handleLoginClick}>Login</Button>{' '}
                    <Link to="/signup">
                        <Button variant="outline-light">Sign Up</Button>{' '}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
