import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userEmail) => {
        // Here you might want to fetch user details or simply store the email
        sessionStorage.setItem('useremail', userEmail);  // Optionally store user data in sessionStorage
        setUser({ email: userEmail });
    };

    const logout = () => {
        sessionStorage.removeItem('useremail');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);