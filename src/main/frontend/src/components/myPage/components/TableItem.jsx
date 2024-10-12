import React from 'react';
import { FaStar } from 'react-icons/fa';

const TableItem = ({ index, english, meaning, isBookmarked, onBookmarkToggle }) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{english}</td>
            <td>{meaning}</td>
            <td>
                <FaStar
                    className={`star-icon ${isBookmarked ? 'filled' : ''}`}
                    onClick={onBookmarkToggle} // 북마크 토글 클릭 시 호출
                />
            </td>
        </tr>
    );
};

export default TableItem;