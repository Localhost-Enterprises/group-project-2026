import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './app';
import '@/app/styles/tailwind.css';
import '@/app/styles/globals.scss';
import { Main } from './components';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<App />}
      >
        <Route
          path="*"
          element={<Main />}
        />
        <Route
          index
          element={<Main />}
        />
      </Route>
      {/*<Route path="/phones" element={<Main />} />
        <Route path="/phones/:slug" element={<Main />} />
        <Route path="/tablets" element={<Main />} />
        <Route path="/tablets/:slug" element={<Main />} />
        <Route path="/accessories" element={<Main />} />
        <Route path="/accessories/:slug" element={<Main />} />
        <Route path="/favorites" element={<Main />} />
        <Route path="/cart" element={<Main />} />*/}
    </Routes>
  </BrowserRouter>,
);
