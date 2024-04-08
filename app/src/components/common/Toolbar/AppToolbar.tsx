import React, { useContext, useMemo } from 'react';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from '@mui/material';

import { ThemeContext } from 'components/contexts/ThemeContextProvider';

const AppToolbar: React.FC = () => {
  const theme = useTheme();
  const { switchColorMode } = useContext(ThemeContext);
  const activateName = useMemo(
    () => (theme.palette.mode === 'dark' ? 'Light' : 'Dark'),
    [theme]
  );

  return (
    <AppBar
      position="static"
      sx={{
        padding: '0px !important',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Toolbar>
        <Box flex={1} />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={`Activate ${activateName} Mode`}>
            <IconButton
              onClick={switchColorMode}
              sx={{
                p: 1,
                border: `1px ${theme.palette.text.disabled} solid`,
              }}
              size="large"
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? (
                <LightModeOutlined />
              ) : (
                <DarkModeOutlined color="action" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
