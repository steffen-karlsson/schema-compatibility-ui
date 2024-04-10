import { Container } from '@mui/material';
import styled from 'styled-components';

export const ContainerWrapper = styled(Container)`
  padding: 0 !important;
  height: 100dvh;
`;

export interface ContentWrapperProps {
  $height: number;
}

export const ContentWrapper = styled.div<ContentWrapperProps>`
  display: flex;
  height: ${(p) => p.$height}px;
`;

export const SubmitWrapper = styled.div`
  margin: auto 2rem 2rem auto;
`;
