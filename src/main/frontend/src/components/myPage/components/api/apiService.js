import axios from 'axios';

// API 서비스 함수

// 프로필 데이터 설정
export const fetchUserProfile = async (userEmail, apiUrl) => {
    try {
        const response = await axios.get(`${apiUrl}/api/user/profile/simple/${userEmail}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
};


// 사용자 카드 설정
export const fetchUserCards = async (apiUrl) => {
    try {
        const response = await axios.get(`${apiUrl}/api/cards/user`, { withCredentials: true });
        return response.data.slice(0, 3);
    } catch (error) {
        console.error('Failed to fetch user cards:', error);
        return [];
    }
};


// 최근 학습한 카드 설정
export const fetchRecentCards = async (apiUrl) => {
    try {
        const response = await axios.get(`${apiUrl}/api/cards/recent`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch recent cards:', error);
        return [];
    }
};


// 즐겨찾기한 카드 설정
export const fetchBookmarkedCards = async (userEmail, apiUrl) => {
    try {
        const response = await axios.get(`${apiUrl}/api/bookmarks/user/${userEmail}`, { withCredentials: true });
        return response.data.map(card => ({ ...card, isBookmarked: true }));
    } catch (error) {
        console.error('Failed to fetch bookmarked cards:', error);
        return [];
    }
};
