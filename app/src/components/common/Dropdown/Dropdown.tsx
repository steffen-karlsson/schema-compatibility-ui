import React from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';

import * as S from './Dropdown.styled';

export interface DropdownOptionProps {
  value: string;
  label: string;
}

export interface DropdownProps {
  label: string;
  options: DropdownOptionProps[];
  value: string;
  onChange: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  props,
}) => {
  return (
    <FormControl {...props}>
      <InputLabel>{label}</InputLabel>
      <S.SelectWrapper
        label={label}
        value={value}
        onChange={(event) => onChange(event.target.value as string)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <S.OptionText>{option.label}</S.OptionText>
          </MenuItem>
        ))}
      </S.SelectWrapper>
    </FormControl>
  );
};

export default Dropdown;
