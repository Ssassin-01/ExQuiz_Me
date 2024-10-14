// 날짜 포맷 함수
import axios from "axios";
import moment from "moment";

export const formatDate = (dateString) => {
    // 입력된 날짜가 ISO 또는 RFC2822 형식이 아니라면 적절히 변환
    return moment(dateString, "YYYY-MM-DD").format("YYYY.MM.DD");
};

// 카드 클릭 핸들러 함수
export const handleCardClick = async (cardNumber, userCards = [], recentCards = [], setRecentCards, apiUrl) => {
    try {
        await axios.post(`${apiUrl}/api/cards/${cardNumber}/view`, {}, { withCredentials: true });

        // recentCards가 null 또는 undefined일 경우 빈 배열로 처리
        if (!recentCards) recentCards = [];

        // userCards가 null 또는 undefined일 경우 빈 배열로 처리
        if (!userCards) userCards = [];

        // 중복 카드 체크
        const isAlreadyInRecent = recentCards.some(card => card.cardNumber === cardNumber);

        if (!isAlreadyInRecent) {
            const newRecentCard = userCards.find(card => card.cardNumber === cardNumber);
            if (newRecentCard) {
                // 새로운 카드를 추가할 때 중복 확인 후 5개까지만 유지
                setRecentCards((prevCards) => [newRecentCard, ...prevCards.slice(0, 4)]);
            }
        }
    } catch (error) {
        console.error('Error logging card view:', error);
    }
};




// 북마크 토글 함수
// 북마크 토글 함수
export const handleBookmarkToggle = async (cardNumber, apiUrl) => {
    try {
        const userEmail = sessionStorage.getItem('useremail');
        if (!userEmail) return;

        const response = await axios.post(`${apiUrl}/api/bookmarks/toggle`, {
            userEmail: userEmail,
            cardNumber: cardNumber
        }, {
            withCredentials: true
        });

        console.log("handleBookmarkToggle response:", response);  // 반환된 전체 response 확인

        // 응답 데이터가 있을 경우 반환
        if (response.status === 200 && (response.data === "Bookmarked" || response.data === "Unbookmarked")) {
            console.log('Bookmark toggle successful:', response.data);
            return response.data;  // 반환값을 명확히 전달
        } else {
            console.error("Unexpected response:", response);
            return null;
        }
    } catch (error) {
        console.error('Failed to toggle bookmark:', error);
        return null;  // 오류 발생 시 null 반환
    }
};
