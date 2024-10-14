import { useState, useEffect } from 'react';
import { fetchUserCards } from '../api/apiService'; // apiService에서 데이터 패칭

export const useUserCards = (apiUrl) => {
    const [userCards, setUserCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserCards = async () => {
            try {
                const cards = await fetchUserCards(apiUrl);
                setUserCards(cards || []);
            } catch (error) {
                console.error("카드 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUserCards();
    }, [apiUrl]);

    return { userCards, loading };
};
