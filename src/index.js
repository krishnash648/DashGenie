import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext'; // ✅ Added this!

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <NotificationProvider> {/* 💡 Notification context wrapped here */}
        <App />
      </NotificationProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
