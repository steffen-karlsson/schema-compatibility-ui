import { Select } from '@mui/material';
import styled from 'styled-components';

export const OptionText = styled.p`
  text-transform: capitalize;
  text-align: left;
  margin: 0;
  padding: 0.6em 0.4em;
`;

export const SelectWrapper = styled(Select)`
  min-width: 200px;

  & .MuiOutlinedInput-input {
    padding: 0 0.4em !important;
  }
`;
