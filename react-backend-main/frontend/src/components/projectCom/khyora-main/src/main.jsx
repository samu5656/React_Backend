import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Note: StrictMode is intentionally NOT used. The motion layer (intro,
// word-splitting, GSAP timelines) mutates the DOM imperatively and is not
// idempotent, so it must initialise exactly once.
createRoot(document.getElementById('root')).render(<App />);
