import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18에서 변경된 부분
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container); // root 생성
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();