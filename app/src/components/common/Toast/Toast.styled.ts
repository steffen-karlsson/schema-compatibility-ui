import { rgba } from 'polished';
import styled from 'styled-components';

import { ToastType } from './ToastType';

export const Toast = styled.div<{ $type: ToastType }>`
  background: ${({ $type }) =>
    $type === 'success' ? rgba(171, 235, 198, 0.6) : rgba(245, 183, 177, 0.6)};
  width: 400px;
  min-height: 64px;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  filter: drop-shadow(0px 4px 16px #f2f3f4);
  margin-top: 10px;
  line-height: 20px;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

export const Message = styled.div`
  font-weight: normal;
  font-size: 14px;
  margin: 3px 0;

  ol,
  ul {
    padding-left: 25px;
    list-style: auto;
  }
`;
