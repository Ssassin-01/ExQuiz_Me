import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the rich text editor

const RichTextEditor = () => {
    const [content, setContent] = useState('');

    const handleContentChange = (content) => {
        setContent(content);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (content) {
            // Process the content
            console.log(content);
        } else {
            // Handle the empty state
            alert('Content cannot be empty.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ReactQuill value={content} onChange={handleContentChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default RichTextEditor;