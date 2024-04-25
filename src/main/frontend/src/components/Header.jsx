import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import "./css/Header.css";

const Header = () => {
    const navigate = useNavigate();
    const useremail = sessionStorage.getItem('useremail');
    const isAuthenticated = sessionStorage.getItem('useremail') !== null;

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleLogoutClick = () => {
        sessionStorage.removeItem('useremail');
        navigate("/");
    };

    return (
        <div className="header">
            {isAuthenticated ? (
                <>
                    <div className="me-2">{useremail}</div>
                    <Link to="/">
                        <Button variant="outline-light" onClick={handleLogoutClick}>Logout</Button>{' '}
                    </Link>
                </>
            ) : (
                <div className="login-signup-buttons">
                    <Link to="/login">
                        <Button variant="outline-light" onClick={handleLoginClick}>Login</Button>{' '}
                    </Link>
                    <Link to="/signup">
                        <Button variant="outline-light">Sign Up</Button>{' '}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
