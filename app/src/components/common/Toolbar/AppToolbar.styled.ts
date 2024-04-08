import { AppBar, Box, IconButton, Theme } from '@mui/material';
import styled from 'styled-components';

interface ThemeProps {
  $theme: Theme;
}

export const AppBarWrapper = styled(AppBar)<ThemeProps>`
  position: static;
  padding: 0 !important;
  background-color: ${(p) => p.$theme.palette.background.default};
`;

export const BoxFlex0Wrapper = styled(Box)`
  flex-grow: 0;
`;

export const IconButtonWrapper = styled(IconButton)<ThemeProps>`
  border: 1px ${(p) => p.$theme.palette.text.disabled} solid;
`;
