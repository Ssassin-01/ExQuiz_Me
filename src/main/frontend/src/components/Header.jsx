import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="header">
        <div className="login-signup-buttons">
          <Link to="/login">
            <Button variant="outline-light" onClick={handleLoginClick}>Login</Button>{' '}
          </Link>
          <Link to="/signup">
            <Button variant="outline-light">Sign Up</Button>{' '}
          </Link>
        </div>
      </div>
  );
};

export default Header;
