import React, { useRef } from 'react';

function TextInputWithFocusButton() {
    // useRef를 사용하여 DOM 요소를 참조
    const inputEl = useRef(null);

    const onButtonClick = () => {
        // current 속성을 통해 참조된 DOM 요소에 접근
        inputEl.current.focus();
    };

    return (
        <div>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </div>
    );
}

export default TextInputWithFocusButton;
