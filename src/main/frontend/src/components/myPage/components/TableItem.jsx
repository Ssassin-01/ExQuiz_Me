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
                    onClick={onBookmarkToggle}
                />
            </td>
        </tr>
    );
};

export default TableItem;