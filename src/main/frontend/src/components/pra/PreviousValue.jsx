// import React, { useState, useEffect, useRef } from 'react';
//
// function PreviousValue() {
//     const [count, setCount] = useState(0);
//     const prevCountRef = useRef();
//
//     useEffect(() => {
//         // 현재 count 값을 이전 값으로 저장
//         prevCountRef.current = count;
//     }, [count]);
//
//     const prevCount = prevCountRef.current;
//
//     return (
//         <div>
//             <p>Current count: {count}</p>
//             <p>Previous count: {prevCount}</p>
//             <button onClick={() => setCount(count + 1)}>Increment</button>
//         </div>
//     );
// }
//
// export default PreviousValue;
