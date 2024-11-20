import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../User/UserContext';
import TableItem from '../../myPage/components/TableItem';

const WordBookmarkSection = () => {
    const { user } = useUser();
    const [bookmarks, setBookmarks] = useState([]);
    const apiUrl = `${window.location.origin}`;

    // 북마크된 단어 가져오기
    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!user || !user.email) return;
            try {
                const response = await axios.get(`${apiUrl}/api/word-bookmarks/user/${user.email}`, {
                    withCredentials: true,
                });
                const fetchedBookmarks = response.data.map(bookmark => ({
                    ...bookmark,
                    isBookmarked: true, // 북마크된 단어 표시
                }));
                setBookmarks(fetchedBookmarks);
            } catch (error) {
                console.error('Failed to fetch word bookmarks:', error);
            }
        };

        fetchBookmarks();
    }, [user, apiUrl]);

    // 북마크 토글 (추가/삭제)
    const toggleBookmark = async (itemId) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/word-bookmarks/toggle?email=${user.email}&itemId=${itemId}`,
                {},
                { withCredentials: true }
            );

            // 북마크 상태 반전
            setBookmarks((prev) =>
                prev.filter((bookmark) => bookmark.itemId !== itemId) // 삭제 시 목록에서 제거
            );
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);
        }
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
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WordBookmarkSection;
