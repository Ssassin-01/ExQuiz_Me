import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        try {
            const email = sessionStorage.getItem('useremail');
            if (email) {
                setUser({ email });
            }
        } catch (error) {
            console.error("Failed to retrieve user email from sessionStorage", error);
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    }, []);

    const login = (email) => {
        try {
            setUser({ email });
            sessionStorage.setItem('useremail', email); // 세션 스토리지에 useremail 저장
        } catch (error) {
            console.error("Failed to store user email in sessionStorage", error);
        }
    };

    const logout = () => {
        try {
            setUser(null);
            sessionStorage.removeItem('useremail'); // 세션 스토리지에서 useremail 제거
        } catch (error) {
            console.error("Failed to remove user email from sessionStorage", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // 로딩 중 메시지 출력
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
