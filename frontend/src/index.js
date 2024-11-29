import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Make sure the 'root' div exists in your index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root div with BrowserRouter to enable routing
root.render(
    <BrowserRouter
        future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}
    >
        <App />
    </BrowserRouter>
);
