import axios from 'axios';

// API 서비스 함수



// 모든 학습 카드 가져오기
export const fetchStudyCards = async (apiUrl) => {
    try {
        const response = await axios.get(`${apiUrl}/api/cards`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch study cards:', error);
        return [];
    }
};

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

        // API에서 vocabularyItems를 포함하여 반환하는지 확인
        return response.data.map(card => ({
            ...card,
            vocabularyItems: card.vocabularyItems || []  // vocabularyItems가 없을 경우 빈 배열 설정
        }));  // 3개의 카드만 반환
    } catch (error) {
        console.error('Failed to fetch user cards:', error);
        return [];
    }
};


// 최근 학습한 카드 설정
export const fetchRecentCards = async (apiUrl) => {
    try {
        const response = await axios.get(`${apiUrl}/api/cards/recent`, { withCredentials: true });

        // 서버 응답에서 vocabularyItems가 존재하는지 확인
        console.log("Recent Cards Data:", response.data);

        return response.data.map(card => ({
            ...card,
            vocabularyItems: card.vocabularyItems || [],  // 빈 배열로 초기화
            countView: card.countView || 0  // countView 기본값 설정
        }));
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
