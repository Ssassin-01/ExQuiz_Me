import { useState, useEffect } from 'react';
import { fetchRecentCards } from '../api/apiService';

export const useRecentCards = (apiUrl) => {
    const [recentCards, setRecentCards] = useState([]);

    const refreshRecentCards = async () => {
        try {
            const updatedRecentCards = await fetchRecentCards(apiUrl);
            setRecentCards(updatedRecentCards);
        } catch (error) {
            console.error("최근 학습 목록 갱신 실패:", error);
        }
    };

    useEffect(() => {
        refreshRecentCards();
    }, [apiUrl]);

    return { recentCards, refreshRecentCards };
};
