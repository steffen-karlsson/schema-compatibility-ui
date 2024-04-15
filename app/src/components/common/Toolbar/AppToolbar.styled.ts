import {
  AppBar,
  Box,
  Icon,
  IconButton,
  Theme,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

interface ThemeProps {
  $theme: Theme;
}

export const AppBarWrapper = styled(AppBar)<ThemeProps>`
  position: static;
  padding: 0 !important;
  background-color: ${(p) => p.$theme.palette.background.default};
  box-shadow: none !important;
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

export const TypographyWithTheme = styled(Typography)<ThemeProps>`
  color: ${(p) => p.$theme.palette.text.primary};
  padding-left: 10px;
`;

export const BrandDisplayWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled(Icon)<ThemeProps>`
  align-content: center;
  color: ${(p) => p.$theme.palette.text.primary};
`;
