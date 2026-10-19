import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import '@/shared/i18n/i18n';
import '@/app/styles/tailwind.css';
import '@/app/styles/globals.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
