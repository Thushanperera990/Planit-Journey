import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This connects the Tailwind styles
import App from './App';
import reportWebVitals from './reportWebVitals';
import './component/CSS/style.css'; // Your custom styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();