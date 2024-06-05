import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from './User/UserContext';
import "./css/Login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new URLSearchParams();
        const apiUrl = process.env.REACT_APP_API_URL;
        formData.append('username', credentials.email);
        formData.append('password', credentials.password);

        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
                credentials: 'include',
            });

            if (response.ok) {
                console.log("Login Successful");
                login(credentials.email);
                navigate("/");
            } else {
                setLoginError('Login failed. Please check your email and password.');
            }
        } catch (error) {
            console.error("Error:", error);
            setLoginError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="login-button">Login</button>
                {loginError && <div className="login-error-message">{loginError}</div>}
            </form>
            <p>Not a member? <Link to="/signup">Register now</Link></p>
        </div>
    );
};

export default Login;