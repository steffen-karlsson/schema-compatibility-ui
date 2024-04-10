import React, { createContext, ReactNode, useMemo, useState } from 'react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import { THEME } from 'storage/const';

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
  if (localStorage.getItem(THEME) === null) {
    localStorage.setItem(THEME, 'light');
  }

  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.getItem(THEME) as 'light' | 'dark'
  );

  const switchColorMode = () => {
    setMode((prevMode) => {
      if (prevMode === 'dark') {
        localStorage.setItem(THEME, 'light');
        return 'light';
      }

      localStorage.setItem(THEME, 'dark');
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
