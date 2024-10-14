import { useState, useEffect } from 'react';
import { fetchBookmarkedCards } from '../api/apiService';

export const useBookmarkedCards = (userEmail, apiUrl) => {
    const [bookmarkedCards, setBookmarkedCards] = useState([]);

    const refreshBookmarkedCards = async () => {
        if (!userEmail) return;
        try {
            const updatedBookmarkedCards = await fetchBookmarkedCards(userEmail, apiUrl);
            setBookmarkedCards(updatedBookmarkedCards);
        } catch (error) {
            console.error("북마크 목록 갱신 실패:", error);
        }
    };

    useEffect(() => {
        refreshBookmarkedCards();
    }, [userEmail, apiUrl]);

    return { bookmarkedCards, refreshBookmarkedCards };
};
