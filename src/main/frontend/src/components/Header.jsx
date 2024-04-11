import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="login-signup-buttons">
        <Link to="/login">
          <button onClick={handleLoginClick}>Login</button>
          <p>heheheheheheeh</p>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
          <p>heheheheheheeh</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
