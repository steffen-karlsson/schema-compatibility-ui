import React, { useContext, useMemo } from 'react';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { Box, Toolbar, Tooltip, useTheme } from '@mui/material';

import { ThemeContext } from 'components/contexts/ThemeContextProvider';

import * as S from './AppToolbar.styled';

const AppToolbar: React.FC = () => {
  const theme = useTheme();
  const { switchColorMode } = useContext(ThemeContext);
  const activateName = useMemo(
    () => (theme.palette.mode === 'dark' ? 'Light' : 'Dark'),
    [theme]
  );

  return (
    <S.AppBarWrapper $theme={theme}>
      <Toolbar>
        <Box flex={1} />
        <S.BoxFlex0Wrapper>
          <Tooltip title={`Activate ${activateName} Mode`}>
            <S.IconButtonWrapper
              $theme={theme}
              onClick={switchColorMode}
              size="large"
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? (
                <LightModeOutlined />
              ) : (
                <DarkModeOutlined color="action" />
              )}
            </S.IconButtonWrapper>
          </Tooltip>
        </S.BoxFlex0Wrapper>
      </Toolbar>
    </S.AppBarWrapper>
  );
};

export default AppToolbar;