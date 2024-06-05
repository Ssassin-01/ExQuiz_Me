import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const email = sessionStorage.getItem('useremail');
        if (email) {
            setUser({ email });
        }
    }, []);

    const login = (email) => {
        setUser({ email });
        sessionStorage.setItem('useremail', email); // 세션 스토리지에 useremail 저장
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('useremail'); // 세션 스토리지에서 useremail 제거
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
