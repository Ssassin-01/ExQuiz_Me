import React, { useState } from "react";
import "./css/Make.css";

const MakeComponent = () => {
  const [items, setItems] = useState([{ id: 1, term: "", definition: "" }]);

  const handleItemChange = (id, field, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => {
    setItems([...items, { id: items.length + 1, term: "", definition: "" }]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="make-section">
      <input
        type="text"
        placeholder="제목을 입력하세요."
        className="title-input"
      />
      <textarea placeholder="설명." className="description-input" />

      {items.map((item, index) => (
        <div key={item.id} className="item">
          <div className="item-number">{index + 1}</div>
          <input
            type="text"
            placeholder="단어"
            value={item.term}
            onChange={(e) => handleItemChange(item.id, "term", e.target.value)}
          />
          <input
            type="text"
            placeholder="뜻"
            value={item.definition}
            onChange={(e) =>
              handleItemChange(item.id, "definition", e.target.value)
            }
          />
          <button onClick={() => removeItem(item.id)}>삭제</button>
        </div>
      ))}
      <button onClick={addItem}>+ 추가하기</button>
    </div>
  );
};

export default MakeComponent;
