// import React, {useState} from "react";
// import './trash22/Card.css';
// import {GrView} from "react-icons/gr";
// import axios from "axios"; // 조회수 아이콘 추가
//
// const Card = ({ cardNumber, cardTitle, cardWriter, cardDate, onLearnClick, initialViewCount, isBookmarked: initialBookmarked, userEmail }) => {
//     const [viewCount, setViewCount] = useState(initialViewCount); // 초기 조회수 설정
//     const [bookmarked, setBookmarked] = useState(initialBookmarked); // 초기 북마크 상태 설정
//     const [isLoading, setIsLoading] = useState(false); // 서버 요청 중 상태 관리
//     const apiUrl = process.env.REACT_APP_API_URL;
//
//     // 조회수 증가 함수
//     const handleCardClick = async () => {
//
//         try {
//             console.log(`Card ${cardNumber} clicked`); // 클릭 확인 로그
//             // 조회수 증가 API 호출
//             const response = await axios.post(
//                 `${apiUrl}/api/cards/${cardNumber}/view`,
//                 {}, // 빈 객체를 사용하여 본문이 없는 POST 요청
//                 {
//                     withCredentials: true, // 쿠키 기반 인증을 위한 옵션 추가
//                 }
//             );
//             console.log('조회수 증가 API 성공', response.data); // 응답 로그
//             if (response.data && response.data.countView !== undefined) {
//                 setViewCount(response.data.countView); // 업데이트된 조회수 설정
//             } else {
//                 setViewCount(prevCount => prevCount + 1); // 임시로 클라이언트에서 조회수 증가
//             }
//             console.log('최종 조회수 확인', response.data.countView);
//         } catch (error) {
//             console.error('조회수 증가 오류:', error);
//         }
//     };
//
//     // 북마크 토글 함수
//     const handleBookmarkToggle = async () => {
//         // event.stopPropagation();
//         setIsLoading(true); // 로딩 상태 설정
//         try {
//             const response = await axios.post(`${apiUrl}/api/bookmarks/toggle`,
//                 {
//                     userEmail: userEmail,  // 사용자 이메일
//                     cardNumber: cardNumber,  // 카드 번호
//                 },
//                 {
//                     withCredentials: true,
//                 }
//             );
//             console.log('북마크 토글 응답:', response.data);
//             if (response.data === "Bookmarked") {
//                 setBookmarked(true); // 북마크된 상태로 설정
//             } else if (response.data === "Unbookmarked") {
//                 setBookmarked(false); // 북마크 해제 상태로 설정
//             }
//         } catch (error) {
//             console.error('북마크 토글 오류:', error);
//         } finally {
//             setIsLoading(false); // 로딩 상태 해제
//         }
//     };
//
//     return (
//         <div className={`container__card ${isLoading ? 'loading' : ''}`}>
//             <div className="card">
//                 <div className="cardImg">
//                 </div>
//                 <div className="card__text"></div>
//                 <div className="card__logo">
//                 </div>
//                 <div className="card__main-text">
//                     <p className="card__main-text-f">{cardTitle}</p>
//                     <p className="card__main-text-s">{cardWriter}</p>
//                 </div>
//                 <div className="card__date">
//                     <p>{new Date(cardDate).toLocaleDateString()}</p>
//                 </div>
//                 <div className="card__views">
//                     <GrView /> {viewCount} {/* 조회수 아이콘과 조회수 표시 */}
//                 </div>
//                 {/* 북마크 아이콘 */}
//                 <div className="card__bookmark">
//                     <span
//                         className={`bookmark-icon ${bookmarked ? 'bookmarked' : ''}`}
//                         onClick={handleBookmarkToggle}
//                         style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }} // 로딩 중일 때 클릭 비활성화
//                     >
//                         {bookmarked ? '★' : '☆'}
//                     </span>
//                 </div>
//                 <div className="card-btn">
//                     <button className="btn_open" onClick={(e) => { e.stopPropagation(); onLearnClick(); handleCardClick(); }}>Learn</button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Card;
