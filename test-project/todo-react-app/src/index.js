import React from 'react';
import { createRoot } from 'react-dom/client';  // createRoot 사용
import './index.css';
import AppRouter from './AppRouter.js';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);  // createRoot로 루트 생성

root.render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>
);

reportWebVitals();
