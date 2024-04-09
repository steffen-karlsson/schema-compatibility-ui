import React, { createContext, ReactNode, useMemo, useState } from 'react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';

type ThemeContextType = {
  switchColorMode: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>({
  switchColorMode: () => {},
});

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'light');
  }

  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark'
  );

  const switchColorMode = () => {
    setMode((prevMode) => {
      if (prevMode === 'dark') {
        localStorage.setItem('theme', 'light');
        return 'light';
      }

      localStorage.setItem('theme', 'dark');
      return 'dark';
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ switchColorMode }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};
