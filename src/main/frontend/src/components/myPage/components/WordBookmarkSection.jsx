import React, { useState, useEffect } from 'react';
import TableItem from './TableItem';
import axios from 'axios';

const WordBookmarkSection = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    // API URL 설정
    const apiUrl = process.env.REACT_APP_API_URL;

    // 사용자의 이메일을 가져오는 함수
    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await axios.get('/api/user/email');
                setUserEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        };

        fetchUserEmail();
    }, []);

    // 단어 북마크 목록 가져오기
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/word-bookmarks/user/${userEmail}`);
                setBookmarks(response.data);
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            }
        };

        if (userEmail) {
            fetchBookmarks();
        }
    }, [userEmail, apiUrl]);

    // 북마크 토글 기능
    const toggleBookmark = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/api/word-bookmarks/toggle`, {
                email: userEmail,
                itemId: id,
            });

            // 토글 성공 시 상태 업데이트
            setBookmarks((prevBookmarks) =>
                prevBookmarks.map((bookmark) =>
                    bookmark.itemId === id
                        ? { ...bookmark, isBookmarked: !bookmark.isBookmarked }
                        : bookmark
                )
            );
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);
        }
    };

    // 단어 삭제 기능 (UI에서 삭제만)
    const removeWord = (id) => {
        setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.itemId !== id));
    };

    return (
        <div className="mypage-content">
            <h3>단어 즐겨찾기</h3>
            <table className="mypage-word-table">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>영어</th>
                    <th>뜻</th>
                    <th>북마크</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {bookmarks.map((bookmark, index) => (
                    <TableItem
                        key={bookmark.itemId}
                        index={index + 1}
                        english={bookmark.englishWord}
                        meaning={bookmark.koreanWord}
                        isBookmarked={bookmark.isBookmarked}
                        onBookmarkToggle={() => toggleBookmark(bookmark.itemId)}
                        onRemove={() => removeWord(bookmark.itemId)}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WordBookmarkSection;

// import React, { useState } from 'react';
// import TableItem from './TableItem';
//
// const WordBookmarkSection = () => {
//     // bookmarks 상태를 컴포넌트 안으로 이동
//     const [bookmarks, setBookmarks] = useState([
//         { id: 1, english: 'apple', meaning: '사과', isBookmarked: true },
//         { id: 2, english: 'banana', meaning: '바나나', isBookmarked: false },
//         { id: 3, english: 'cherry', meaning: '체리', isBookmarked: true },
//         { id: 4, english: 'date', meaning: '대추', isBookmarked: false },
//         { id: 5, english: 'eggplant', meaning: '가지', isBookmarked: true },
//     ]);
//
//     // 북마크 토글 기능
//     const toggleBookmark = (id) => {
//         setBookmarks((prevBookmarks) =>
//             prevBookmarks.map((bookmark) =>
//                 bookmark.id === id
//                     ? { ...bookmark, isBookmarked: !bookmark.isBookmarked }
//                     : bookmark
//             )
//         );
//     };
//
//     // 단어 삭제 기능
//     const removeWord = (id) => {
//         setBookmarks((prevBookmarks) =>
//             prevBookmarks.filter((bookmark) => bookmark.id !== id)
//         );
//     };
//
//     return (
//         <div className="mypage-content">
//             <h3>단어 즐겨찾기</h3>
//             <table className="mypage-word-table">
//                 <thead>
//                 <tr>
//                     <th>번호</th>
//                     <th>영어</th>
//                     <th>뜻</th>
//                     <th>북마크</th>
//                     <th>삭제</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {bookmarks.map((bookmark, index) => (
//                     <TableItem
//                         key={bookmark.id}
//                         index={index + 1}
//                         english={bookmark.english}
//                         meaning={bookmark.meaning}
//                         isBookmarked={bookmark.isBookmarked}
//                         onBookmarkToggle={() => toggleBookmark(bookmark.id)}
//                         onRemove={() => removeWord(bookmark.id)}
//                     />
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export default WordBookmarkSection;
