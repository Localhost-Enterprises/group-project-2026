import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './app';
import '@/app/styles/tailwind.css';
import '@/app/styles/globals.scss';
import { HomePage } from './pages/HomePage';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<App />}
      >
        <Route
          path="*"
          element={<HomePage />}
        />
      </Route>
    </Routes>
  </BrowserRouter>,
);
