import React, { useContext, useMemo } from 'react';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { Box, Toolbar, Tooltip, useTheme } from '@mui/material';

import { ThemeContext } from 'components/contexts/ThemeContextProvider';

import * as S from './AppToolbar.styled';

export enum ChildrenAlignment {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface AppToolbarProps {
  title: string;
  icon?: React.ReactNode;
  align: ChildrenAlignment;
  children?: React.ReactNode;
  childrenGap?: number;
}

const AppToolbar = React.forwardRef<HTMLDivElement, AppToolbarProps>(
  (props, ref) => {
    const { title, icon, align, children, childrenGap } = props;
    const theme = useTheme();
    const { switchColorMode } = useContext(ThemeContext);
    const activateName = useMemo(
      () => (theme.palette.mode === 'dark' ? 'Light' : 'Dark'),
      [theme]
    );

    return (
      <S.AppBarWrapper $theme={theme} ref={ref}>
        <Toolbar>
          <S.BrandDisplayWrapper>
            {icon && (
              <S.IconWrapper $theme={theme} color="inherit" fontSize="large">
                {icon}
              </S.IconWrapper>
            )}
            <S.TypographyWithTheme $theme={theme}>
              {title}
            </S.TypographyWithTheme>
          </S.BrandDisplayWrapper>
          {children ? (
            <S.BoxFlexWrapper align={align} gap={childrenGap} flex={1}>
              {children}
            </S.BoxFlexWrapper>
          ) : (
            <Box flex={1} />
          )}
          <S.BoxFlex0Wrapper>
            <Tooltip title={`Activate ${activateName} Mode`}>
              <S.IconButtonWrapper
                $theme={theme}
                onClick={switchColorMode}
                size="small"
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
  }
);

export default AppToolbar;
