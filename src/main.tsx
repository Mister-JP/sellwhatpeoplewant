/**
 * Boots the browser application and contains no product behavior. React strict
 * mode intentionally exercises effects twice during development so persistence
 * and lifecycle code must remain repeatable before production hides mistakes.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/montserrat/latin-400.css';
import '@fontsource/montserrat/latin-600.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/montserrat/latin-800.css';
import { App } from './app/App';
import './styles/public.css';

const applicationRoot = document.getElementById('root');

if (applicationRoot === null) {
  throw new Error('The application root element is missing from index.html.');
}

createRoot(applicationRoot).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
