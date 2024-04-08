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

interface AlignmentProps {
  align: 'left' | 'right';
  gap?: number;
}

export const BoxFlexWrapper = styled(Box)<AlignmentProps>`
  display: flex;
  justify-content: ${(p) => p.align};
  gap: ${(p) => p.gap || 0}px;
  padding-right: ${(p) => p.gap || 0}px;
`;

export const IconButtonWrapper = styled(IconButton)<ThemeProps>`
  border: 1px ${(p) => p.$theme.palette.text.disabled} solid;
`;
