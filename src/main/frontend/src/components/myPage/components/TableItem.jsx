import React from 'react';

const TableItem = ({ index, english, meaning, isBookmarked, onBookmarkToggle, onRemove }) => {
    return (
        <tr>
            <td>{index}</td>
            <td>{english}</td>
            <td>{meaning}</td>
            <td>
                <span
                    className={`word-bookmark-icon ${isBookmarked ? 'bookmarked' : ''}`}
                    onClick={onBookmarkToggle}
                >
                    {isBookmarked ? '★' : '☆'}
                </span>
            </td>
            <td>
                <button className="delete-btn" onClick={onRemove}>
                    x
                </button>
            </td>
        </tr>
    );
};

export default TableItem;
