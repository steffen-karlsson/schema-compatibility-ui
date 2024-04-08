import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';

import App from './components/App';
import { ThemeContextProvider } from './components/contexts/ThemeContextProvider';

import 'global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
