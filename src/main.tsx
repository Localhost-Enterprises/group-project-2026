import { createRoot } from 'react-dom/client';
import { App } from './app';
import React from 'react';

import '@/app/styles/tailwind.css';
import '@/app/styles/globals.scss';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
