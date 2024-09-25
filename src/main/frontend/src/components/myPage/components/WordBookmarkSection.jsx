import React, { useState } from 'react';
import TableItem from './TableItem';

const WordBookmarkSection = () => {
    // bookmarks 상태를 컴포넌트 안으로 이동
    const [bookmarks, setBookmarks] = useState([
        { id: 1, english: 'apple', meaning: '사과', isBookmarked: true },
        { id: 2, english: 'banana', meaning: '바나나', isBookmarked: false },
        { id: 3, english: 'cherry', meaning: '체리', isBookmarked: true },
        { id: 4, english: 'date', meaning: '대추', isBookmarked: false },
        { id: 5, english: 'eggplant', meaning: '가지', isBookmarked: true },
    ]);

    // 북마크 토글 기능
    const toggleBookmark = (id) => {
        setBookmarks((prevBookmarks) =>
            prevBookmarks.map((bookmark) =>
                bookmark.id === id
                    ? { ...bookmark, isBookmarked: !bookmark.isBookmarked }
                    : bookmark
            )
        );
    };

    // 단어 삭제 기능
    const removeWord = (id) => {
        setBookmarks((prevBookmarks) =>
            prevBookmarks.filter((bookmark) => bookmark.id !== id)
        );
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
                        key={bookmark.id}
                        index={index + 1}
                        english={bookmark.english}
                        meaning={bookmark.meaning}
                        isBookmarked={bookmark.isBookmarked}
                        onBookmarkToggle={() => toggleBookmark(bookmark.id)}
                        onRemove={() => removeWord(bookmark.id)}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WordBookmarkSection;
